"use client";

import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart({data}) {

    const xLabelKey = Object.keys(data[0]).find(key => key !== "date");

    // Here, we are getting the days between of two dates, it helps us to graph the cartesian plane
    const dataWithoutGaps = []; 

    // console.log(data);

    data.forEach((value, index) => {
      const date = value.date;

        dataWithoutGaps.push({
            date,
            [xLabelKey]: value?.[xLabelKey] || 0,
        })

        const nextDate = data?.[index + 1]?.date;
        if (date && nextDate) {
            const daysBetween = differenceInDays(
                parseISO(nextDate),
                parseISO(date),
        )
        // Here, we have checked that in console we have printed the date and the next date
        // console.log({date, nextDate, daysBetween});
        // console.log({daysBetween});
        if (daysBetween > 0) {
            // console.log({date,nextDate,daysBetween});
            // console.log("date start", date);
            for (let i = 1; i < daysBetween; i++) {
                const dateBetween = formatISO9075(addDays(parseISO(date), i)).split(" ")[0];

                dataWithoutGaps.push({
                    date: dateBetween,
                    [xLabelKey]: 0,
                })
                // console.log({dateBetween});
            }
            // console.log("date end", nextDate);
            // console.log("-----------------");
        }
      }
    })

    return (
        <div>
            {/* Test
            <pre>
                {JSON.stringify(dataWithoutGaps)}
            </pre>
            {console.log(dataWithoutGaps, data)} */}
            <ResponsiveContainer width={"100%"} height={200}>
                <LineChart width={730} height={250} data={dataWithoutGaps}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid horizontal={false} strokeWidth="5" stroke="#f5f5f5" strokeDasharray="3 3" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} tick={{fill:"#aaa"}}/>
                    <YAxis axisLine={false} tickLine={false} tickMargin={10} tick={{fill:"#aaa"}}/>
                    <Tooltip />
                    <Line type="monotone" dataKey={xLabelKey} stroke="#09f" strokeWidth={"4"}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
