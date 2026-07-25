import type { EquationCalcResult, EquationDef } from "@budgets_municipaux/common";

import { BarChart } from "@mui/icons-material";

import { Chart as ChartPlot, Bar } from 'react-chartjs-2'
interface ITCVprops {
    equation: EquationDef,
    data: EquationCalcResult[],
    capitation:boolean
}

export default function IndicatorsTransChartVisualisation(props: ITCVprops) {
    if (props.data.length > 0 && props.data[0].cells.length > 0) {
        const datasets = props.data[0].cells.map(cO => {
            const data = props.data.map(city =>
                city.cells.find(cell => cell.eq_var_symbol === cO.eq_var_symbol)?.value ?? 0
            );

            console.log(cO.eq_var_symbol, cO.eq_var_id, data);

            return {
                label: cO.eq_var_symbol,
                data,
            };
        });
        let datasetsWRes
        if (props.capitation===true){
             datasetsWRes=[{ label: props.equation.eq_name, data: props.data.map((city) => city.result) }]
        }else{
            datasetsWRes = [...datasets, { label: props.equation.eq_name, data: props.data.map((city) => city.result) }]
        }
        const dude = {
            labels: props.data.map((city) => city.nom_organisme),
            datasets: datasetsWRes
        }
        const reformattedData = {
            ...dude
        }
        return (<>
            <ChartPlot
                type={'bar'}
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
                            text: props.capitation?`${props.equation.eq_name} = (${props.equation.eq_expression})/pop`:`${props.equation.eq_name} = ${props.equation.eq_expression}`,
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
                                font:{
                                    size:20,
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