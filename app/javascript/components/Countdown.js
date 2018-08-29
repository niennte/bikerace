import React, { Component } from "react";
import helpers from "./helpers"

const numSecondsIn = {
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60
};

const handlePlural = (value) => {
    return value === 1 ? "" : "s";
};

class Countdown extends Component {

    constructor(props) {
        super(props);
        this.date = new Date(2020, 3, 1);
        this.now = new Date();
        this.state = {
            // call setInterval as soon as the window object becomes available
            // and save reference to state so as to cause re rendering
            tick: typeof window !== "undefined" && setInterval(this.updateContdown.bind(this), 1000),
            // initial rendering
            secondsLeft: Math.floor((this.date - this.now) / 1000),
            countdown: {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        };
        // initial rendering
        this.updateContdown();

        this.buildCalendar = this.buildCalendar.bind(this);
        this.addPartialDays = this.addPartialDays.bind(this);
        this.buildClock = this.buildClock.bind(this)
    }


    updateContdown() {
        this.now = new Date();
        this.setState({
            secondsLeft: Math.floor((this.date - this.now) / 1000)
        });
        this.addPartialDays();
        this.buildCalendar();
        this.buildClock();
    }

    buildCalendar() {
        let months = (this.date.getFullYear() * 12 + this.date.getMonth()) - (this.now.getFullYear() * 12 + this.now.getMonth());
        this.state.countdown.months = months < 1 ? 0 : months - 1;

        if (this.state.countdown.months / 12 > 1) {
            this.state.countdown.years = Math.floor(this.state.countdown.months / 12);
            this.state.countdown.months -= this.state.countdown.years * 12;
        }
    }

    addPartialDays() {
        // days left from today to the end of the month
        let monthEnd = new Date(this.now.getTime());
        monthEnd.setMonth(this.now.getMonth() + 1);
        monthEnd.setDate(0); // the day before the first day of the the next month
        const thisMonthsDays = monthEnd.getDate() > this.now.getDate() ? monthEnd.getDate() - this.now.getDate() : 0;

        // days from the beginning of the target month to the target date
        let targetMonthDays = 0;
        if (this.date.getMonth() !== this.now.getMonth()) {
            targetMonthDays = this.date.getDate()
        }
        this.state.countdown.days = thisMonthsDays + targetMonthDays;
    }

    buildClock() {
        // disregard day count as days are counted by calendar
        // just update the total second count
        this.state.secondsLeft -= Math.floor(this.state.secondsLeft / numSecondsIn.day) * numSecondsIn.day;
        // hours - update, subtract from total
        this.state.countdown.hours = Math.floor(this.state.secondsLeft / numSecondsIn.hour)
        this.state.secondsLeft -= Math.floor(this.state.secondsLeft / numSecondsIn.hour) * numSecondsIn.hour;
        // minutes - - update, subtract from total
        this.state.countdown.minutes = Math.floor(this.state.secondsLeft / numSecondsIn.minute);
        this.state.secondsLeft -= Math.floor(this.state.secondsLeft / numSecondsIn.minute) * numSecondsIn.minute;
        // seconds
        this.state.countdown.seconds = this.state.secondsLeft
    }

    render() {
        const { countdown } = this.state;

        return (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <div className="">
            <h1 className="text-center">
                Coming up {this.date.toDateString()}
            </h1>

            <ul className="countdown calendar nav justify-content-center">
                <li className="nav-item mx-1">
                    <span className="nav-link">
                        <span className="value">{ countdown.years }</span>
                        <span className="description"> Year{ handlePlural(countdown.years) }</span>
                    </span>
                </li>
                <li className="nav-item mx-1">
                    <span className="nav-link">
                        <span className="value">{ countdown.months }</span>
                        <span className="description"> Month{ handlePlural(countdown.months) }</span>
                    </span>
                </li>
                <li className="nav-item mx-1">
                    <span className="nav-link">
                        <span className="value">{ countdown.days }</span>
                        <span className="description"> Day{ handlePlural(countdown.days) }</span>
                    </span>
                </li>
            </ul>

            <ul className="countdown clock nav justify-content-center mt-2">
                <li className="nav-item mx-1">
                    <span className="nav-link">
                        <span className="value">{ countdown.hours }</span>
                        <span className="description"> Hour{ handlePlural(countdown.hours) }</span>
                    </span>
                </li>
                <li className="nav-item mx-1">
                    <span className="nav-link">
                        <span className="value">{ countdown.minutes }</span>
                        <span className="description"> Minute{ handlePlural(countdown.minutes) }</span>
                    </span>
                </li>
                <li className="nav-item mx-1">
                    <span className="nav-link">
                        <span className="value">{ countdown.seconds }</span>
                        <span className="description"> Second{ handlePlural(countdown.seconds) }</span>
                    </span>
                </li>
            </ul>
            </div>
            </div>


        </React.Fragment>
        );
    }
}

export default Countdown