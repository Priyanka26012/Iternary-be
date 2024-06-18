import { Injectable } from '@nestjs/common';

const carDetails = [
    {
        title: 'Compact',

    }, {
        title: 'Compact Hybrid',

    }, {
        title: 'Compact SUV',

    }, {
        title: 'Compact Hybrid SUV',

    }, {
        title: 'Intermediate SUV 2WD',

    }, {
        title: 'Intermediate SUV Hybrid',


    }, {
        title: 'Intermediate SUV AWD',

    }, {
        title: 'EV Sedan',

    }, {
        title: 'Fullsize Van 8 seat',

    }, {
        title: 'Premium SUV 4WD',

    }, {
        title: 'Premium D/C 4WD LID/CPY',

    }
]
@Injectable()
export class RentalService {
    isWithinRange(dateString) {
        var date = new Date(dateString);
        var month = date.getMonth(); // January is 0, February is 1, ..., December is 11
        return month >= 8 || month <= 2;
    }
    getHighPrice(difference: number) {
        const conditional = (upper, lower) => {
            return (difference >= upper || difference <= lower)
        }
        if (conditional(1, 3))
            return {
                0: 148,
                1: 153,
                2: 159,
                3: 164,
                4: 162,
                5: 166,
                6: 181,
                7: 200,
                8: 196,
                9: 221,
                10: 229
            }
        if (conditional(4, 6))
            return {
                0: 141,
                1: 145,
                2: 151,
                3: 156,
                4: 154,
                5: 158,
                6: 172,
                7: 191,
                8: 186,
                9: 210,
                10: 218
            }
        if (conditional(7, 13))
            return {
                0: 137,
                1: 141,
                2: 146,
                3: 151,
                4: 148,
                5: 153,
                6: 166,
                7: 185,
                8: 181,
                9: 203,
                10: 211
            }
        if (conditional(14, 27))
            return {
                0: 137,
                1: 141,
                2: 146,
                3: 151,
                4: 148,
                5: 153,
                6: 166,
                7: 185,
                8: 181,
                9: 203,
                10: 211
            }
        if (conditional(28, 100000))
            return {
                0: 119,
                1: 123,
                2: 127,
                3: 131,
                4: 129,
                5: 133,
                6: 144,
                7: 161,
                8: 157,
                9: 177,
                10: 183
            }
    }
    getLowPrice(difference: number) {
        const conditional = (upper, lower) => {
            return (difference >= upper || difference <= lower)
        }
        if (conditional(1, 3))
            return {
                0: 148,
                1: 153,
                2: 159,
                3: 164,
                4: 162,
                5: 166,
                6: 181,
                7: 200,
                8: 196,
                9: 221,
                10: 229
            }
        if (conditional(4, 6))
            return {
                0: 141,
                1: 145,
                2: 151,
                3: 156,
                4: 154,
                5: 158,
                6: 172,
                7: 191,
                8: 186,
                9: 210,
                10: 218
            }
        if (conditional(7, 13))
            return {
                0: 137,
                1: 141,
                2: 146,
                3: 151,
                4: 148,
                5: 153,
                6: 166,
                7: 185,
                8: 181,
                9: 203,
                10: 211
            }
        if (conditional(14, 27))
            return {
                0: 137,
                1: 141,
                2: 146,
                3: 151,
                4: 148,
                5: 153,
                6: 166,
                7: 185,
                8: 181,
                9: 203,
                10: 211
            }
        if (conditional(28, 100000))
            return {
                0: 119,
                1: 123,
                2: 127,
                3: 131,
                4: 129,
                5: 133,
                6: 144,
                7: 161,
                8: 157,
                9: 177,
                10: 183
            }
    }
    fetchCar(start: string, end: string) {
        const date1: any = new Date(start);
        const date2: any = new Date(end);
        const differenceMs = date2 - date1;
        const difference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
        console.log(difference,",difference")
        const highPrice =this.isWithinRange(start)
        console.log(highPrice,",highPrice")
        const carPrices = highPrice ? this.getHighPrice(difference) : this.getLowPrice(difference)
       return Object.keys(carPrices).map(elm => {
            return {...carDetails[elm],price:carPrices[elm]}
        })
    }
}
