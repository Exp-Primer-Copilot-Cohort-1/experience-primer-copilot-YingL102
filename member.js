function skillsMember() {
  var skills = [
    { name: 'JavaScript', level: 1 },
    { name: 'HTML', level: 2 },
    { name: 'CSS', level: 3 }
  ];
  this.skills = skills;
  this.addSkill = function(skill) {
    this.skills.push(skill);
  };
}