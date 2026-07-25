import type { EquationCalcResult, EquationDef } from "@budgets_municipaux/common";


import { Chart as ChartPlot } from 'react-chartjs-2'
interface ITCVprops {
    equation: EquationDef,
    data: EquationCalcResult[]
    capitation:boolean
}
interface cell{
    cod_geo:number,
    nom_organisme:string,
    result:number
}

interface Result{
    year:number,
    cells:cell[]
}

export default function IndicatorsLongChartVisualisation(props: ITCVprops) {
    if (props.data.length > 0 && props.data[0].cells.length > 0) {
        const allMuns = [...new Set(props.data.map(l => l.cod_geo))];
        const groups = new Map<string, Result>();

        for (const line of props.data) {

            const key = `${line.year}`;

            let group = groups.get(key);

            if (!group) {

                group = {
                    year: line.year,
                    cells: []
                };

                groups.set(key, group);
            }

            group.cells.push({
                cod_geo: line.cod_geo,
                nom_organisme: line.nom_organisme,
                result: line.result
            });
        }
        const groupsDisp = [...groups.values()].sort((a, b) => a.year - b.year)
        const datasets = allMuns.map((mun)=>
            {
                return{
                    label:groupsDisp[0].cells.find((c)=>c.cod_geo===mun)?.nom_organisme??mun.toString(),
                    data:groupsDisp.map((y)=>y.cells.find((c)=>c.cod_geo===mun)?.result??0)
                }
            }
        )
        const dude = {
            labels: groupsDisp.map((year) => (year.year??0).toString()),
            datasets: datasets
        }
        const reformattedData = {
            ...dude
        }
        return (<>
            <ChartPlot
                type={'line'}
                data={reformattedData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true
                            }
                        },
                        title: {
                            display: true,
                            text: props.capitation?`${props.equation.eq_name} = (${props.equation.eq_expression})/pers`:`${props.equation.eq_name} = ${props.equation.eq_expression}`,
                            font: {
                                size: 30,
                            }
                        },
                        colors: {
                            forceOverride: true,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Municipalité',
                                font: {
                                    size: 25,
                                }
                            },
                            ticks: {
                                font: {
                                    size: 20
                                }
                            },
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: props.capitation?'Dollars/pers':'Dollars',
                                font: {
                                    size: 20,
                                }
                            },
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 20,
                                },
                                callback: (value) =>
                                    new Intl.NumberFormat('fr-CA', {
                                        maximumFractionDigits: 0,
                                    }).format(Number(value)) + '$',
                            }
                        },
                    }
                }}
            //plugins={[levelLinePlugin]}
            />
        </>)
    } else {
        return (<></>)
    }
}