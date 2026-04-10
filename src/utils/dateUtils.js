export const buildWeek = () => {
  const today = new Date();

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });
};

export const keyOfDate = (date) => date.toISOString().split('T')[0];

export const parseDateKey = (dateKey) => new Date(`${dateKey}T00:00:00`);

export const formatFull = (date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
