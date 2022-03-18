const getUsers = async () => {
  const response = await fetch('/allusers');
  const data = await response.json();
  console.log(data)
  return [...data]
}


