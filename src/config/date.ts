// export const date = (scheduleDoctor: string, queueUserDate: string) => {
//   const [startHout, endHour] = `${scheduleDoctor}`.split('-');
//   const currentDateTime = new Date();

//   const [sHour, sMinute] = startHout.split(':');
//   const [eHour, eMinute] = endHour.split(':');
//   const checkPoint = 45;
//   const starDate = currentDateTime.setHours(Number(sHour), Number(sMinute), 0, 0);
//   const endDate = currentDateTime.setHours(Number(eHour), Number(eMinute), 0, 0);

//   if (!queueUserDate) {
//     return new Date(starDate);
//   }

//   const [uHour, uMinute] = queueUserDate.split(':');
//   const userDate = currentDateTime.setHours(Number(uHour), Number(uMinute), 0, 0);

//   if (userDate === endDate) {
//     return new Date(starDate);
//   }

//   if (Number(checkPoint) + Number(uMinute) >= 60) {
//     const resutMinut = Number(checkPoint) + Number(uMinute) - 60;
//     const queueDate = currentDateTime.setHours(Number(uHour) + 1, Number(resutMinut), 0, 0);

//     return new Date(queueDate);
//   }

//   const queueDate = currentDateTime.setHours(Number(uHour), Number(checkPoint), 0, 0);

//   return new Date(queueDate);
// };

// const moment = require('moment');

// // Create a new moment object with the time set to 09:00
// const newMoment = moment('09:00', 'HH:mm').add(30 * 20, 'm');

// console.log(newMoment, moment('18:00', 'HH:mm'), newMoment.valueOf() >= moment('18:00', 'HH:mm').valueOf());
// if (newMoment.valueOf() >= moment('18:00', 'HH:mm').valueOf()) {
//   console.log('Error Date:', newMoment);
// }
