const [startHout, endHour] = `08:00-18:00`.split('-');
const currentDateTime = new Date();

const userTime = '13:20';

const [sHour, sMinute] = startHout.split(':');
const [eHour, eMinute] = endHour.split(':');
const checkPoint = 45;
const starDate = currentDateTime.setHours(Number(sHour), Number(sMinute), 0, 0);
const endDate = currentDateTime.setHours(Number(eHour), Number(eMinute), 0, 0);

if (!userTime) {
  console.log(new Date(starDate));
}

let [uHour, uMinute] = userTime.split(':');
const userDate = currentDateTime.setHours(Number(uHour), Number(uMinute), 0, 0);

if (userDate === endDate) {
  console.log(new Date(starDate));
}

if (Number(checkPoint) + Number(uMinute) >= 60) {
  console.log(Number(checkPoint) + Number(uMinute));
  ++uHour;

  console.log(uHour);
  const resutMinut = Number(checkPoint) + Number(uMinute) - 60;
  const queueDate = currentDateTime.setHours(Number(uHour), Number(resutMinut), 0, 0);

  console.log(new Date(queueDate), 2);
}

const queueDate = currentDateTime.setHours(Number(uHour), Number(checkPoint), 0, 0);

console.log(new Date(queueDate), 1);
