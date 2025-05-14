export const buildActivityTimeline = (activity, usedApps, intervalMinutes = 1) => {
    const timeline = [];
  
    const start = new Date(activity.startTime);
    const end = new Date(activity.endTime);
    const totalMinutes = Math.ceil((end - start) / 60000);
  
    const steps = Math.ceil(totalMinutes / intervalMinutes);
  
    // Подготовим массив с пустыми интервалами
    for (let i = 0; i < steps; i++) {
      timeline.push({ keyboard: 0, mouse: 0, idle: 0 });
    }
  
    // Простейшее распределение активности
    const avgKeyboard = activity.keyboardActivity / steps;
    const avgMouse = activity.mouseActivity / steps;
    const avgIdle = activity.idleDuration / steps;
  
    for (let i = 0; i < steps; i++) {
      timeline[i].keyboard = Math.round(avgKeyboard);
      timeline[i].mouse = Math.round(avgMouse);
      timeline[i].idle = Math.round(avgIdle);
    }
  
    return timeline;
  };
  