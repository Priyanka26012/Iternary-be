import { Injectable } from '@nestjs/common';

const carDetails = [
    {
        title: 'Compact',
        pax: 5,
        img: 'compact-suv.png'
    }, {
        title: 'Compact Hybrid',
        pax: 5,
        img: 'compact.png'

    }, {
        title: 'Compact SUV',
        pax: 5,
        img: 'compact-suv.png'
    }, {
        title: 'Compact Hybrid SUV',
        pax: 5,
        img: 'compact.png'

    }, {
        title: 'Intermediate SUV 2WD',
        pax: 5,
        img: 'compact-suv.png'

    }, {
        title: 'Intermediate SUV Hybrid',
        pax: 5,

        img: 'compact-suv.png'

    }, {
        title: 'Intermediate SUV AWD',
        pax: 5,
        img: 'Intermediate.png'

    }, {
        title: 'EV Sedan',
        pax: 5,
        img: 'compact-suv.png'

    }, {
        title: 'Fullsize Van 8 seat',
        pax: 8,
        img: 'fullsize-minvan.png'

    }, {
        title: 'Premium SUV 4WD',
        pax: 7,
        img: 'premium-suv.png',

    }, {
        title: 'Premium D/C 4WD LID/CPY',
        pax: 5,
        img: 'premium-4wd.png'

    }
]
@Injectable()
export class RentalService {
    private highSeasonMonths: number[] = [8, 9, 10, 11, 0, 1, 2]; // Sep to Mar

    private parseDate(dateString: string): Date {
        const [day, month, year] = dateString.split('/');
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    private isWithinHighSeason(date: Date): boolean {
        return this.highSeasonMonths.includes(date.getMonth());
    }

    private getDaysDifference(start: Date, end: Date): number {
        const differenceMs = end.getTime() - start.getTime();
        return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    }

    private getPrices(difference: number, isHighSeason: boolean): Record<number, number> {
        const getPriceSet = (prices: number[]) => {
            return Object.fromEntries(prices.map((price, index) => [index, price]));
        };

        if (difference >= 1 && difference <= 3) {
            return getPriceSet([148, 153, 159, 164, 162, 166, 181, 200, 196, 221, 229]);
        } else if (difference >= 4 && difference <= 6) {
            return getPriceSet([141, 145, 151, 156, 154, 158, 172, 191, 186, 210, 218]);
        } else if (difference >= 7 && difference <= 13) {
            return getPriceSet([137, 141, 146, 151, 148, 153, 166, 185, 181, 203, 211]);
        } else if (difference >= 14 && difference <= 27) {
            return getPriceSet([137, 141, 146, 151, 148, 153, 166, 185, 181, 203, 211]);
        } else if (difference >= 28) {
            return getPriceSet([119, 123, 127, 131, 129, 133, 144, 161, 157, 177, 183]);
        }

        // Default case, you might want to handle this differently
        return getPriceSet([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    fetchCar(start: string, end: string) {
        const startDate = this.parseDate(start);
        const endDate = this.parseDate(end);

        const difference = this.getDaysDifference(startDate, endDate);

        // Check if both start and end dates are within high season
        const isHighSeason = this.isWithinHighSeason(startDate)
        //  && this.isWithinHighSeason(endDate);

        const carPrices = this.getPrices(difference, isHighSeason);

        return Object.keys(carPrices).map(elm => {
            const index = Number(elm);
            return {
                ...carDetails[index],
                totalPrice: carPrices[index],
                price: `$${carPrices[index]} | ${carDetails[index]?.pax} passenger`,
                isHighSeason: isHighSeason
            };
        });
    }
}