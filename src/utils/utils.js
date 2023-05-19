export function changeMinutesWordForm(minutes) {
  const mins = `${minutes}`;
  if (mins.endsWith("1")) {
    return "минута";
  } else if (mins.endsWith("2") || mins.endsWith("3") || mins.endsWith("4")) {
    return "минуты";
  } else {
    return "минут";
  }
}
