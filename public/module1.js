'use strict';
const module1 = (function () {
    const drop = document.getElementsByClassName("dropbtn").item(0);
    const dropA = document.getElementsByTagName("a");
    const date = document.getElementsByName("calendar");
    let arr = [];
    return {
        start() {
            const dateOffset = (24 * 60 * 60 * 1000) * 7;
            const endDate = new Date();
            let startDate = new Date();
            [].forEach.call(dropA, function (el) {
                el.addEventListener('click', module1.updDrop);
            });
            startDate.setTime(endDate.getTime() - dateOffset);
            date.item(0).valueAsDate = startDate;
            date.item(1).valueAsDate = endDate;
            document.getElementById("accept").addEventListener("click", module1.getC);
            module1.getC(7);
        },

        getC(days) {

            arr = [];
            let startDate = date.item(0).valueAsDate;
            const endDate = date.item(1).valueAsDate;
            const now=new Date();
            if(startDate>=endDate||endDate>now||startDate>=now)
            {
                alert("Даты выбраны некорректно.Попробуйте еще раз.")
                return;
            }
            let m, str;

            async function myFunction() {
                while (startDate <= endDate) {
                    m = startDate.getMonth() + 1;
                    str = startDate.getFullYear() + "-" + m + "-" + startDate.getDate();
                    const res = await module0.getCurr(drop.textContent, str);
                    startDate = module1.addArr(res, startDate);
                }
            }

            myFunction().then(() => {
                module1.drawChart();
            });
        },
        addArr(r, startDate) {
            const r2 = JSON.parse(r);
            let r3 = new Date(r2.Date);
            arr.push([new Date(r3.getFullYear(), ("0" + (r3.getMonth())).slice(-2), ("0" + r3.getDate()).slice(-2)), r2.Cur_OfficialRate]);
            startDate.setTime(startDate.getTime() + (24 * 60 * 60 * 1000));
            return startDate;
        },
        updDrop() {
            drop.textContent = event.currentTarget.textContent;
        },
        drawChart() {
            let data = new google.visualization.DataTable();
            data.addColumn('date', 'Дата');
            data.addColumn('number', drop.textContent);
            data.addRows(arr);
            let formatter1 = new google.visualization.NumberFormat(
                {fractionDigits: 4});
            formatter1.format(data, 0);
            let date_formatter = new google.visualization.DateFormat({pattern: 'YYYY-MM-DD'});
            date_formatter.format(data, 1);
            let options = {
                chart: {
                    title: 'Курс валюты',
                    subtitle: 'по отношению к белорусскому рублю'
                },
                width: 900,
                height: 500,
                vAxis: {
                    format: 'decimal'
                }
            };
            let chart = new google.charts.Line(document.getElementById('linechart_material'));
            chart.draw(data, google.charts.Line.convertOptions(options));
        },
    };
}());
