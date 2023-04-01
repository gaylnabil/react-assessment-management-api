const truncate = (str, start = 0, end) => {
  return `${str.substring(start, end)}...`;
};

export { truncate };
