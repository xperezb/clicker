import { AhmedComponent } from "../components/empire-view/components/ahmed/ahmed.component";
import { BikeComponent } from "../components/empire-view/components/bike/bike.component";
import { CigsComponent } from "../components/empire-view/components/cigs/cigs.component";
import { CocaineComponent } from "../components/empire-view/components/cocaine/cocaine.component";
import { DeaAgentComponent } from "../components/empire-view/components/dea-agent/dea-agent.component";
import { FarmComponent } from "../components/empire-view/components/farm/farm.component";
import { FbiAgentComponent } from "../components/empire-view/components/fbi-agent/fbi-agent.component";
import { GhbComponent } from "../components/empire-view/components/ghb/ghb.component";
import { HeroinComponent } from "../components/empire-view/components/heroin/heroin.component";
import { HtrafficComponent } from "../components/empire-view/components/htraffic/htraffic.component";
import { MethComponent } from "../components/empire-view/components/meth/meth.component";
import { MotorbikeComponent } from "../components/empire-view/components/motorbike/motorbike.component";
import { Ms13Component } from "../components/empire-view/components/ms13/ms13.component";
import { OxycodoneComponent } from "../components/empire-view/components/oxycodone/oxycodone.component";
import { PoliceComponent } from "../components/empire-view/components/police/police.component";
import { PrerolledComponent } from "../components/empire-view/components/prerolled/prerolled.component";
import { St18Component } from "../components/empire-view/components/st18/st18.component";
import { SuperheroComponent } from "../components/empire-view/components/superhero/superhero.component";
import { TruckComponent } from "../components/empire-view/components/truck/truck.component";
import { Defense } from "../interfaces/defense";
import { Upgrade } from "../interfaces/upgrade";
import { Attack } from "../interfaces/attack";
import { AssaultComponent } from "../components/empire-view/components/assault/assault.component";
import { GangComponent } from "../components/empire-view/components/gang/gang.component";

export const UPGRADES: Upgrade[] = [
    {   
        id: 1, 
        name: 'Cigarrete', 
        cost: 10, costIncrease: 1.16, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 5, 
        icon: CigsComponent 
    },
    {   
        id: 2, 
        name: 'Prerolled Joint', 
        cost: 100, costIncrease: 1.16, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 100, 
        icon: PrerolledComponent 
    },
    {   
        id: 3, 
        name: 'Marihuana Buds', 
        cost: 500, costIncrease: 1.16, 
        pointsIncrease: 4, 
        count: 0, 
        requiredPoints: 1000, 
        icon: FarmComponent 
    },
    { 
        id: 4, 
        name: 'Cocaine', 
        cost: 2000, 
        costIncrease: 1.16, 
        pointsIncrease: 5, 
        count: 0, 
        requiredPoints: 10000, 
        icon: CocaineComponent 
    },
    { 
        id: 5, 
        name: 'GHB', 
        cost: 2000, 
        costIncrease: 1.16, 
        pointsIncrease: 5, 
        count: 0, 
        requiredPoints: 20000, 
        icon: GhbComponent
    },
    {   
        id: 6, 
        name: 'Oxycodone', 
        cost: 5000, costIncrease: 1.16, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 50000, 
        icon: OxycodoneComponent 
    },
    { 
        id: 7, 
        name: 'Heroin', 
        cost: 10000, 
        costIncrease: 1.16, 
        pointsIncrease: 10, 
        count: 0, 
        requiredPoints: 100000, 
        icon: HeroinComponent
    },
    { 
        id: 8, 
        name: 'Produce Meth', 
        cost: 30000, 
        costIncrease: 1.16, 
        pointsIncrease: 50, 
        count: 0, 
        requiredPoints: 500000, 
        icon: MethComponent
    },
    { 
        id: 9, 
        name: 'Human Being', 
        cost: 1000000, 
        costIncrease: 1.16, 
        pointsIncrease: 100, 
        count: 0, 
        requiredPoints: 1000000, 
        icon: HtrafficComponent 
    },
  ];
  
  export const CLICK_UPGRADES: Upgrade[] = [

    // { id: 0, name: 'Magic button', cost: 0, costIncrease: 0, pointsIncrease: 1000000, count: 0, requiredPoints: 0, icon: FarmComponent },

    { 
        id: 1, 
        name: 'Bike', 
        cost: 10, 
        costIncrease: 1.16, 
        pointsIncrease: 1, 
        count: 0, 
        requiredPoints: 5,
        icon: BikeComponent
    },
    {
        id: 2, 
        name: 'MotorBike', 
        cost: 100, 
        costIncrease: 1.16, 
        pointsIncrease: 5, 
        count: 0, 
        requiredPoints: 100,
        icon: MotorbikeComponent
    },
    {
        id: 3, 
        name: 'Ahmed', 
        cost: 1000, 
        costIncrease: 1.16, 
        pointsIncrease: 10, 
        count: 0, 
        requiredPoints: 200,
        icon: AhmedComponent
    },
    { 
        id: 4, 
        name: 'Pick-up Truck', 
        cost: 50000, 
        costIncrease: 1.16, 
        pointsIncrease: 100, 
        count: 0, 
        requiredPoints: 400,
        icon: TruckComponent
    },
    { 
        id: 5, 
        name: 'Local Police Officer', 
        cost: 100000, 
        costIncrease: 1.16, 
        pointsIncrease: 1500, 
        count: 0, 
        requiredPoints: 1000,
        icon: PoliceComponent
    }, 
    { 
        id: 6, 
        name: 'FBI Agent', 
        cost: 1000000, 
        costIncrease: 1.16, 
        pointsIncrease: 2000, 
        count: 0, 
        requiredPoints: 2000,
        icon: FbiAgentComponent
    },
    { 
        id: 7, 
        name: 'DEA Agent', 
        cost: 5000000, 
        costIncrease: 1.16, 
        pointsIncrease: 2000, 
        count: 0, 
        requiredPoints: 2000,
        icon: DeaAgentComponent 
    }
    
  ];
  export const DEFENSES: Defense[] = [

    {
        id: 1, 
        name: 'M13 Gang Member', 
        cost: 10000, 
        costIncrease: 1.16, 
        pointsIncrease: 50, 
        count: 0, 
        requiredPoints: 5000,
        icon: Ms13Component
    },
    { 
        id: 2, 
        name: '18ST Gang Member', 
        cost: 10000, 
        costIncrease: 1.16, 
        pointsIncrease: 50, 
        count: 0, 
        requiredPoints: 5000,
        icon: St18Component
    },
    { 
        id: 3, 
        name: 'Superhero', 
        cost: 50000000, 
        costIncrease: 1.16, 
        pointsIncrease: 100, 
        count: 0, 
        requiredPoints: 20000,
        icon: SuperheroComponent 
    }
  ]

  export const ATTACKS: Attack[] = [
    { 
        id: 1, 
        name: 'Gang Assault',
        points: 50, 
        icon: GangComponent
    },
    { 
        id: 2, 
        name: 'Police Raid',
        points: 100,
        icon: AssaultComponent
    }
]