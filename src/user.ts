interface User {
  name: string
  cpf: string
}

export const createUser = (user: User) => {
	console.log(user);
};
