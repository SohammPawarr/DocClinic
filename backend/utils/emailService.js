const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

// Send appointment notification to clinic with Confirm/Reject buttons
const sendAppointmentNotification = async (appointmentData, userData) => {
  try {
    const transporter = createTransporter();
    
    const confirmUrl = `${process.env.BASE_URL}/api/appointments/confirm/${appointmentData.confirmationToken}`;
    const rejectUrl = `${process.env.BASE_URL}/api/appointments/reject/${appointmentData.confirmationToken}`;
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.CLINIC_EMAIL,
      subject: `🗓️ New Appointment Request - ${userData.name} - DocClinic`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #c41e3a 0%, #a01830 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📋 New Appointment Request</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">A patient has booked an appointment</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            
            <!-- Patient Info Card -->
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #c41e3a;">
              <h3 style="color: #333; margin: 0 0 15px; font-size: 16px;">👤 Patient Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${userData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${userData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Phone:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${userData.phone || appointmentData.patientPhone || 'Not provided'}</td>
                </tr>
              </table>
            </div>
            
            <!-- Appointment Details Card -->
            <div style="background: #fff5f5; border-radius: 10px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #c41e3a;">
              <h3 style="color: #333; margin: 0 0 15px; font-size: 16px;">📅 Appointment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;">Date:</td>
                  <td style="padding: 8px 0; color: #c41e3a; font-weight: 700; font-size: 16px;">${appointmentData.appointmentDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Time:</td>
                  <td style="padding: 8px 0; color: #c41e3a; font-weight: 700; font-size: 16px;">${appointmentData.appointmentTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Health Concern:</td>
                  <td style="padding: 8px 0; color: #333;">${appointmentData.healthConcern || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Symptoms:</td>
                  <td style="padding: 8px 0; color: #333;">${appointmentData.symptoms || 'Not specified'}</td>
                </tr>
                ${appointmentData.additionalNotes ? `
                <tr>
                  <td style="padding: 8px 0; color: #666;">Additional Notes:</td>
                  <td style="padding: 8px 0; color: #333;">${appointmentData.additionalNotes}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #666;">Doctor:</td>
                  <td style="padding: 8px 0; color: #333;">${appointmentData.preferredDoctor || 'Dr. Rajesh Sharma'}</td>
                </tr>
              </table>
            </div>
            
            <!-- Action Buttons -->
            <div style="text-align: center; padding: 20px 0;">
              <p style="color: #333; font-weight: 600; margin: 0 0 20px; font-size: 16px;">Take Action on this Appointment:</p>
              
              <a href="${confirmUrl}" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 10px 10px;">
                ✓ CONFIRM
              </a>
              
              <a href="${rejectUrl}" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 10px 10px;">
                ✗ REJECT
              </a>
            </div>
            
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px; margin: 0;">This is an automated notification from DocClinic</p>
            <p style="color: #999; font-size: 11px; margin: 5px 0 0;">Appointment ID: ${appointmentData.id}</p>
          </div>
          
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Appointment notification sent to clinic');
    return { success: true };
  } catch (error) {
    console.error('Error sending appointment notification:', error);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to patient (booking received)
const sendPatientConfirmation = async (appointmentData, userData, confirmationToken) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userData.email,
      subject: '✅ Appointment Request Received - DocClinic',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #c41e3a 0%, #a01830 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">DocClinic</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">Homeopathy & Natural Healing</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <h2 style="color: #333; margin: 0 0 20px;">Hello ${userData.name}! 👋</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              Thank you for booking an appointment with DocClinic. Your appointment request has been received and is being reviewed by our team.
            </p>
            
            <!-- Status Badge -->
            <div style="background: #fef3c7; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 25px;">
              <span style="color: #d97706; font-weight: 600;">⏳ Status: PENDING CONFIRMATION</span>
            </div>
            
            <!-- Appointment Details Card -->
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #c41e3a; margin: 0 0 15px; font-size: 16px;">📅 Your Appointment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #e0e0e0;">Date:</td>
                  <td style="padding: 10px 0; color: #333; font-weight: 600; border-bottom: 1px solid #e0e0e0; text-align: right;">${appointmentData.appointmentDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #e0e0e0;">Time:</td>
                  <td style="padding: 10px 0; color: #333; font-weight: 600; border-bottom: 1px solid #e0e0e0; text-align: right;">${appointmentData.appointmentTime}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #e0e0e0;">Health Concern:</td>
                  <td style="padding: 10px 0; color: #333; border-bottom: 1px solid #e0e0e0; text-align: right;">${appointmentData.healthConcern || 'General Consultation'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Doctor:</td>
                  <td style="padding: 10px 0; color: #333; text-align: right;">${appointmentData.preferredDoctor || 'Dr. Rajesh Sharma'}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              You will receive another email once your appointment is <strong style="color: #10b981;">confirmed</strong> or if there are any changes.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-top: 20px;">
              If you have any questions, feel free to contact us.
            </p>
            
            <p style="margin-top: 30px; color: #333;">
              Best regards,<br>
              <strong style="color: #c41e3a;">Dr. Rajesh Sharma</strong><br>
              <span style="color: #666; font-size: 14px;">DocClinic - Homeopathy & Natural Healing</span><br>
              <span style="color: #666; font-size: 12px;">📍 215 Medic Avenue, New Delhi - 110015, India</span>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px; margin: 0;">© 2025 DocClinic. All rights reserved.</p>
          </div>
          
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to patient');
    return { success: true };
  } catch (error) {
    console.error('Error sending patient confirmation:', error);
    return { success: false, error: error.message };
  }
};

// Send status update email to patient (when appointment is confirmed/rejected by clinic)
const sendStatusUpdateEmail = async (appointmentData, userData) => {
  try {
    const transporter = createTransporter();
    
    const statusConfig = {
      'pending': { color: '#fbbf24', bg: '#fef3c7', icon: '⏳', title: 'Pending Review' },
      'confirmed': { color: '#10b981', bg: '#d1fae5', icon: '✅', title: 'Appointment Confirmed!' },
      'rejected': { color: '#ef4444', bg: '#fee2e2', icon: '❌', title: 'Appointment Not Available' },
      'cancelled': { color: '#ef4444', bg: '#fee2e2', icon: '🚫', title: 'Appointment Cancelled' },
      'completed': { color: '#6366f1', bg: '#e0e7ff', icon: '🎉', title: 'Appointment Completed' }
    };
    
    const config = statusConfig[appointmentData.status] || statusConfig['pending'];
    
    const getStatusMessage = (status) => {
      switch(status) {
        case 'confirmed':
          return `
            <p style="color: #333; line-height: 1.6;">
              Great news! Your appointment has been <strong style="color: #10b981;">confirmed</strong>. We look forward to seeing you!
            </p>
            <div style="background: #d1fae5; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46; font-weight: 600;">📍 Please arrive 10 minutes before your scheduled time.</p>
            </div>
          `;
        case 'rejected':
          return `
            <p style="color: #333; line-height: 1.6;">
              Unfortunately, we are unable to accommodate your appointment at the requested time. This could be due to scheduling conflicts or the slot being unavailable.
            </p>
            <div style="background: #fee2e2; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #991b1b;">Please try booking a different time slot or contact us for assistance.</p>
            </div>
          `;
        case 'cancelled':
          return `
            <p style="color: #333; line-height: 1.6;">
              Your appointment has been cancelled. If you wish to reschedule, please book a new appointment through our website.
            </p>
          `;
        case 'completed':
          return `
            <p style="color: #333; line-height: 1.6;">
              Thank you for visiting DocClinic! We hope your consultation was helpful. Feel free to book a follow-up appointment if needed.
            </p>
          `;
        default:
          return `
            <p style="color: #333; line-height: 1.6;">
              Your appointment is currently being reviewed by our team.
            </p>
          `;
      }
    };
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userData.email,
      subject: `${config.icon} ${config.title} - DocClinic`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #c41e3a 0%, #a01830 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">DocClinic</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">Homeopathy & Natural Healing</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            
            <h2 style="color: #333; margin: 0 0 20px;">Hello ${userData.name}! 👋</h2>
            
            <!-- Status Badge -->
            <div style="background: ${config.bg}; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 25px; border: 2px solid ${config.color};">
              <span style="font-size: 32px; display: block; margin-bottom: 10px;">${config.icon}</span>
              <span style="color: ${config.color}; font-weight: 700; font-size: 18px;">${config.title.toUpperCase()}</span>
            </div>
            
            ${getStatusMessage(appointmentData.status)}
            
            <!-- Appointment Details Card -->
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #c41e3a; margin: 0 0 15px; font-size: 16px;">📅 Appointment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #e0e0e0;">Date:</td>
                  <td style="padding: 10px 0; color: #333; font-weight: 600; border-bottom: 1px solid #e0e0e0; text-align: right;">${appointmentData.appointmentDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #e0e0e0;">Time:</td>
                  <td style="padding: 10px 0; color: #333; font-weight: 600; border-bottom: 1px solid #e0e0e0; text-align: right;">${appointmentData.appointmentTime}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Health Concern:</td>
                  <td style="padding: 10px 0; color: #333; text-align: right;">${appointmentData.healthConcern || 'General Consultation'}</td>
                </tr>
              </table>
            </div>
            
            <p style="margin-top: 30px; color: #333;">
              Best regards,<br>
              <strong style="color: #c41e3a;">Dr. Rajesh Sharma</strong><br>
              <span style="color: #666; font-size: 14px;">DocClinic - Homeopathy & Natural Healing</span><br>
              <span style="color: #666; font-size: 12px;">📍 215 Medic Avenue, New Delhi - 110015, India</span>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px; margin: 0;">© 2025 DocClinic. All rights reserved.</p>
          </div>
          
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Status update email sent to patient');
    return { success: true };
  } catch (error) {
    console.error('Error sending status update email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAppointmentNotification,
  sendPatientConfirmation,
  sendStatusUpdateEmail
};
