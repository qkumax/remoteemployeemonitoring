import PDFDocument from 'pdfkit';

export const generateActivityPdf = (activity, usedApps, screenshots, stream) => {
  const doc = new PDFDocument();

  doc.pipe(stream);

  doc.fontSize(20).text('Activity Report', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Session ID: ${activity.id}`);
  doc.text(`Start Time: ${activity.startTime}`);
  doc.text(`End Time: ${activity.endTime}`);
  doc.text(`Keyboard Activity: ${activity.keyboardActivity}`);
  doc.text(`Mouse Activity: ${activity.mouseActivity}`);
  doc.text(`Idle: ${activity.isIdle ? 'Yes' : 'No'}`);
  doc.text(`Idle Duration: ${activity.idleDuration} sec`);
  doc.moveDown();

  doc.fontSize(14).text('Used Applications:');
  usedApps.forEach(app => {
    doc.fontSize(12).text(`- ${app.name}: ${app.duration} sec`);
  });

  doc.moveDown().fontSize(14).text('Screenshots:');
  screenshots.forEach(shot => {
    doc.fontSize(12).text(`- ${shot.timestamp}: ${shot.url}`);
  });

  doc.end();
};
