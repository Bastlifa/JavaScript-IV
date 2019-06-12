// CODE here for your Lambda Classes

class Person
{
    constructor(personAttrs)
    {
        this.name = personAttrs.name;
        this.age = personAttrs.age;
        this.location = personAttrs.location;
    }
    speak() {console.log(`Hello, my name is ${this.name}, I am from ${this.location}.`);}
}

class Instructor extends Person
{
    constructor(instAttrs)
    {
        super(instAttrs);
        this.specialty = instAttrs.specialty;
        this.favLanguage = instAttrs.favLanguage;
        this.catchPhrase = instAttrs.catchPhrase;
    }
    demo(subject) {console.log(`Today we are learning about ${subject}`);}
    grade(stdntObj, subject) {console.log(`${stdntObj.name} receives a perfect score on ${subject}`);}
    assignGrade(stdntObj) 
    {
        stdntObj.grade += Math.round(Math.random()*20) - 10; 
        if (stdntObj.grade > 100) {stdntObj.grade = 100} 
        if(stdntObj.grade < 0){stdntObj.grade=0}}
}

class Student extends Person
{
    constructor(stndtAttrs)
    {
        super(stndtAttrs);
        this.previousBackground = stndtAttrs.previousBackground;
        this.className = stndtAttrs.className;
        this.favSubjects = stndtAttrs.favSubjects;
        this.grade = stndtAttrs.grade;
    }
    litstSubjects() {this.favSubjects.forEach(elem => console.log(elem));}
    PRAssignment(subject) {console.log(`${this.name} has submitted a PR for ${subject}`);}
    sprintChallenge(subject) {console.log(`${this.name} has begun a sprint challenge on ${subject}`);}
    announceGrade() {console.log(`${this.name} has grade: ${this.grade}`);}
    graduate()
    {
        while (this.grade < 70)
        {
            this.announceGrade();
            brock.assignGrade(this);
        }
        console.log(`${this.name} may graduate!`);
    }
}

class ProjectManager extends Instructor
{
    constructor(pjmAttrs)
    {
        super(pjmAttrs);
        this.gradClassName = pjmAttrs.gradClassName;
        this.favInstructor = pjmAttrs.favInstructor;
    }
    standUp(slckChan) {console.log(`${this.name} announces to ${slckChan}, @channel standy times!`);}
    debugsCode(stdntObj, subject) {console.log(`${this.name} debugs ${stdntObj.name}'s code on ${subject}`);}
}

const dan = new Instructor
({
    name: 'Dan',
    location: 'Denver',
    age: 30,
    favLanguage: 'javaScript',
    specialty: 'node',
    catchPhrase: 'thread your answers'
});

const josh = new Instructor
({
    name: 'Josh',
    location: 'Ontario',
    age: 38,
    favLanguage: 'PHP',
    specialty: 'Back-End',
    catchPhrase: `Stay on topic`
});

const brock = new ProjectManager
({
    name: 'Brock',
    location: 'Flo-rida',
    age: 35,
    specialty: 'React',
    favLanguage: 'go',
    catchPhrase: "It's all good",
    gradClassName: 'WEB10',
    favInstructor: 'Dan'
})

const marguel = new ProjectManager
({
    name: 'Marguel',
    location: 'Wisconsin',
    age: 28,
    specialty: 'CSS',
    favLanguage: 'C++',
    catchPhrase: "Hello there",
    gradClassName: 'WEB12',
    favInstructor: 'Josh'
})

const eli = new Student
({
    name: "Eli",
    age: 37,
    location: "Ohio",
    previousBackground: "Made a video game, did some research",
    className: "Web21",
    favSubjects: ['JavaScript', 'CSS', 'HTML'],
    // grade: Math.round(Math.random()*100)
    grade: Math.round(Math.random()*100)
});

const guy = new Student
({
    name: "Guy",
    age: 30,
    location: "Earth",
    previousBackground: "Welded stuff",
    className: "Web21",
    favSubjects: ['Flexboxes', 'React', 'Javascript'],
    grade: Math.round(Math.random()*100)
});

console.log('\n');
brock.standUp('web21_brock');
marguel.debugsCode(guy, 'React');
eli.litstSubjects();
eli.PRAssignment('Javascript');
guy.sprintChallenge('CSS');
dan.demo('Class Inheritance');
josh.grade(eli, 'HTML');
// Stretch
eli.announceGrade();
dan.assignGrade(eli);
eli.announceGrade();
brock.assignGrade(eli);
eli.announceGrade();
eli.graduate();