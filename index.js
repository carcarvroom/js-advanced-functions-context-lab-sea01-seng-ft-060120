/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


const createEmployeeRecord = (personArray) => {
    return {
      firstName: personArray[0],
      familyName: personArray[1],
      title: personArray[2],
      payPerHour: personArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  const createEmployeeRecords = (employeeArray) => {
    const newEmployeeArray = []
    employeeArray.forEach(array => newEmployeeArray.push(createEmployeeRecord(array)))
    return newEmployeeArray
  }
  
  const createTimeInEvent = function(timestamp) {
    const [date, hour] = timestamp.split(' ')
    this.timeInEvents.push({
      type: 'TimeIn',
      hour: Number(hour),
      date: date
    })
    return this
  }
  
  const createTimeOutEvent = function(timestamp) {
    const [date, hour] = timestamp.split(' ')
    this.timeOutEvents.push({
      type: 'TimeOut',
      hour: Number(hour),
      date: date
    })
    return this
  }
  
  const hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find( e => e.date === date)
    let timeOut = this.timeOutEvents.find( e => e.date === date)
    return (timeOut.hour - timeIn.hour)/100
  }
  
  const wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
  }

  const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(record => record.firstName === firstName)
  }
  
  const calculatePayroll = (employeeArray) => {
    let sumPay = employeeArray.map(employee => allWagesFor.call(employee))
    return sumPay.reduce(function(a, b) {
      return a + b
    })
  }