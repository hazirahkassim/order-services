import React from "react";

export default function JobNotification({ orderId, technicianName, customerName, customerPhone, finalAmount, remarks }) {
  if (!customerPhone || !orderId || !technicianName) {
    return null; 
  }

  const waMsg  = `Hi ${customerName}, job ${orderId} is completed by Technician ${technicianName}.Please check and leave feedback. Thank you!`.trim();
  const emailMsg = `Job ${orderId} has been completed. Technician: ${technicianName} Final Amount: RM ${finalAmount} Remarks: ${remarks} Please update the records accordingly.`;

  const waURL = `https://wa.me/6${customerPhone}?text=${encodeURIComponent(waMsg )}`;
  const mailURL = `mailto:manager@example.com?subject=Job Completed ${orderId}&body=${encodeURIComponent(emailMsg)}`;

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Notify Parties</h4>
      <button onClick={() => window.open(waURL, "_blank")} style={{ marginRight: 10 }}>
        Send WhatsApp to Customer
      </button>
      <button onClick={() => window.open(mailURL, "_blank")}>
        Email Manager
      </button>
    </div>
  );
}
