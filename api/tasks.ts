import { addDays, startOfToday } from 'date-fns';
export async function getCareTasks(userId: string) {
  const today = startOfToday();

  return [
    {
      plant_id: 1,
      task_type: 'Water',
      interval_days: 7,
      next_due: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      plant_id: 1,
      task_type: 'Pruning',
      interval_days: 7,
      next_due: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      plant_id: 1,
      task_type: 'Water',
      interval_days: 7,
      // 2 days from today
      next_due: addDays(today, 2).toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      plant_id: 2,
      task_type: 'Fertilise',
      interval_days: 14,
      // 4 days from today
      next_due: addDays(today, 4).toISOString(),
      created_at: new Date().toISOString(),
    },
  ];
}
