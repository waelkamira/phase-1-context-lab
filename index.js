function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
    
  function createTimeInEvent(dateString) {
    const [date, hour] = dateString.split(' ');
  
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
  
    this.timeInEvents.push(timeInEvent);
  
    return this;
  }

  function createTimeOutEvent(dateString) {
    const [date, hour] = dateString.split(' ');
  
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    };
  
    this.timeOutEvents.push(timeOutEvent);
  
    return this;
  }

  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
  
    return 0;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wagesEarned = hoursWorked * this.payPerHour;
    return wagesEarned;
  }

  function allWagesFor() {
    const dates = this.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((sum, date) => sum + wagesEarnedOnDate.call(this, date), 0);
    return totalWages;
  }
  
  function createEmployeeRecords(data) {
    return data.map(row => createEmployeeRecord(row));
  }
  
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }
    