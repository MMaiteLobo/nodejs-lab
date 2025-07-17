const person = {
	name: 'Palta',
	age: 0,
	greet() {
		console.log('Hi, I am ' + this.name);
	}
};

const printName = ({ name }	) => {
	console.log(name);
};
printName(person);

const { name, age } = person;
console.log(name, age);



const hobbies = ['Bite', 'Eat', 'Sleep'];

const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2)



