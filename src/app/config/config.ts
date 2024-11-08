import { BikeComponent } from "../components/empire-view/components/bike/bike.component";
import { CigsComponent } from "../components/empire-view/components/cigs/cigs.component";
import { CocaineComponent } from "../components/empire-view/components/cocaine/cocaine.component";
import { FarmComponent } from "../components/empire-view/components/farm/farm.component";
import { GhbComponent } from "../components/empire-view/components/ghb/ghb.component";
import { HeroinComponent } from "../components/empire-view/components/heroin/heroin.component";
import { HtrafficComponent } from "../components/empire-view/components/htraffic/htraffic.component";
import { MethComponent } from "../components/empire-view/components/meth/meth.component";
import { OxycodoneComponent } from "../components/empire-view/components/oxycodone/oxycodone.component";
import { PrerolledComponent } from "../components/empire-view/components/prerolled/prerolled.component";
import { Upgrade } from "../interfaces/upgrade";

export const UPGRADES: Upgrade[] = [
    {   
        id: 6, 
        name: 'Cigarrete', 
        cost: 10, costIncrease: 0, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 0, 
        icon: CigsComponent 
    },
    {   
        id: 7, 
        name: 'Prerolled Joint', 
        cost: 100, costIncrease: 0, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 0, 
        icon: PrerolledComponent 
    },
    {   
        id: 1, 
        name: 'Marihuana Buds', 
        cost: 500, costIncrease: 0, 
        pointsIncrease: 4, 
        count: 0, 
        requiredPoints: 0, 
        icon: FarmComponent 
    },
    { 
        id: 2, 
        name: 'Cocaine', 
        cost: 2000, 
        costIncrease: 0, 
        pointsIncrease: 5, 
        count: 0, 
        requiredPoints: 100, 
        icon: CocaineComponent 
    },
    { 
        id: 2, 
        name: 'GHB', 
        cost: 2000, 
        costIncrease: 0, 
        pointsIncrease: 5, 
        count: 0, 
        requiredPoints: 100, 
        icon: GhbComponent
    },
    {   
        id: 7, 
        name: 'Oxycodone', 
        cost: 100, costIncrease: 0, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 0, 
        icon: OxycodoneComponent 
    },
    { 
        id: 3, 
        name: 'Heroin', 
        cost: 10000, 
        costIncrease: 0, 
        pointsIncrease: 10, 
        count: 0, 
        requiredPoints: 200, 
        icon: HeroinComponent
    },
    { 
        id: 4, 
        name: 'Produce Meth', 
        cost: 5000, 
        costIncrease: 0, 
        pointsIncrease: 50, 
        count: 0, 
        requiredPoints: 300, 
        icon: MethComponent
    },
    { 
        id: 5, 
        name: 'Traffic Humans', 
        cost: 100000, 
        costIncrease: 0, 
        pointsIncrease: 100, 
        count: 0, 
        requiredPoints: 400, 
        icon: HtrafficComponent 
    },
  ];
  
  export const CLICK_UPGRADES: Upgrade[] = [

    { id: 0, name: 'Magic button', cost: 0, costIncrease: 0, pointsIncrease: 1000000, count: 0, requiredPoints: 0, icon: FarmComponent },

    { 
        id: 1, 
        name: 'Bike', 
        cost: 10, 
        costIncrease: 0, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 0,
        icon: BikeComponent
    },
    {
        id: 2, 
        name: 'MotorBike', 
        cost: 100, 
        costIncrease: 0, 
        pointsIncrease: 5, 
        count: 0, 
        requiredPoints: 100 
    },
    {
        id: 3, 
        name: 'Ahmed', 
        cost: 1000, 
        costIncrease: 0, 
        pointsIncrease: 10, 
        count: 0, 
        requiredPoints: 200 
    },
    {
        id: 4, 
        name: 'M13 Gang Member', 
        cost: 10000, 
        costIncrease: 0, 
        pointsIncrease: 50, 
        count: 0, 
        requiredPoints: 300
    },
    { 
        id: 5, 
        name: '18ST Gang Member', 
        cost: 10000, 
        costIncrease: 0, 
        pointsIncrease: 50, 
        count: 0, 
        requiredPoints: 300
    },
    { 
        id: 6, 
        name: 'Pick-up Truck', 
        cost: 50000, 
        costIncrease: 0, 
        pointsIncrease: 100, 
        count: 0, 
        requiredPoints: 400 
    },
    { 
        id: 7, 
        name: 'Local Police Officer', 
        cost: 100000, 
        costIncrease: 0, 
        pointsIncrease: 1500, 
        count: 0, 
        requiredPoints: 1000
    }, 
    { 
        id: 8, 
        name: 'FBI Agent', 
        cost: 1000000, 
        costIncrease: 0, 
        pointsIncrease: 2000, 
        count: 0, 
        requiredPoints: 2000
    },
    { 
        id: 9, 
        name: 'CIA Agent', 
        cost: 5000000, 
        costIncrease: 0, 
        pointsIncrease: 2000, 
        count: 0, 
        requiredPoints: 2000 
    }
  ];