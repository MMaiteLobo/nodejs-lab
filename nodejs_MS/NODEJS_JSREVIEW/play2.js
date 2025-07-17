const person = {
	name: 'Palta',
	age: 0,
	greet() {
		console.log('Hi, I am ' + this.name);
	}
};

person.greet();



const hobbies = ['Bite', 'Eat', 'Sleep', 1, true];

for (let hobby of hobbies) {
	console.log(hobby);
}

console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
console.log(hobbies);


