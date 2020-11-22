
export const fetchBoards = async () => {
  const response = await fetch('/boards');
  const boards = response.json();
  return boards;
}