const CheckWeek = (start = 'February 9, 2022') => {
    const startDate = new Date(start);
    const dateNow = new Date();

    const pastDaysOfYear = (dateNow - startDate) / 86400000;

    return Math.ceil((pastDaysOfYear + startDate.getDay() + 1) / 7);
}

export default CheckWeek;