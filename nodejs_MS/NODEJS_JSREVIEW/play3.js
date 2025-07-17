const person = {
	name: 'Palta',
	age: 0,
	greet() {
		console.log('Hi, I am ' + this.name);
	}
};

person.greet();

const copiedPerson = { ...person };
console.log(copiedPerson);


const hobbies = ['Bite', 'Eat', 'Sleep'];

const copiedArray = [...hobbies];
console.log(copiedArray);

const toArray = (...args) => {
	return args;
};
console.log(toArray(1, 2, 3, 4, 5));








