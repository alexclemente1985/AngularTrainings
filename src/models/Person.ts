class Person {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  country: string;

  constructor(p: Person) {
    this.firstname = p.firstname;
    this.lastname = p.lastname;
    this.email = p.email;
    this.city = p.city;
    this.country = p.country;
  }
}

export { Person };
