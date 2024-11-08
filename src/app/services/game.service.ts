import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Upgrade } from '../interfaces/upgrade';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private points = 0;
  public totalPoints = 0;
  public pointsPerClick = 1;
  public pointsPerSecond = 0;

  private clickUpgradeCost = 10;
  private clickUpgradeCount = 0;

  upgrades: Upgrade[] = [
    { id: 1, name: 'Marihuana Bud', cost: 10, increase: 1, count: 0, requiredPoints: 0 },
    { id: 2, name: 'Sling Cocaine', cost: 50, increase: 5, count: 0, requiredPoints: 100 },
    { id: 3, name: 'Sell Heroin', cost: 300, increase: 10, count: 0, requiredPoints: 500 },
    { id: 4, name: 'Produce Meth', cost: 600, increase: 50, count: 0, requiredPoints: 800 },
    { id: 5, name: 'Prostitute', cost: 1000, increase: 100, count: 0, requiredPoints: 1000 },
  ];

  clickUpgrades: Upgrade[] = [
    { id: 0, name: 'Bike', cost: 10, increase: 1, count: 0, requiredPoints: 0 },
    { id: 1, name: 'Motor Bike', cost: 80, increase: 1, count: 0, requiredPoints: 0 },
    { id: 2, name: 'Ahmed', cost: 150, increase: 2, count: 0, requiredPoints: 10 },
    { id: 3, name: 'Encrypted Communication Devices', cost: 210, increase: 4, count: 0, requiredPoints: 30 },
    { id: 4, name: 'Car', cost: 2000, increase: 8, count: 0, requiredPoints: 70 },
    { id: 5, name: 'M13 Gang Member', cost: 3000, increase: 16, count: 0, requiredPoints: 150 },
    { id: 6, name: '18ST Gang Member', cost: 3000, increase: 32, count: 0, requiredPoints: 310 },
    { id: 7, name: 'Pick-up Truck', cost: 5000, increase: 64, count: 0, requiredPoints: 630 },
    { id: 8, name: 'Local Police Officer', cost: 10000, increase: 128, count: 0, requiredPoints: 1270 },
    { id: 13, name: 'Bulletproof Vest', cost: 11960, increase: 4096, count: 0, requiredPoints: 40950 },
    { id: 9, name: 'Glock G17 + ammo', cost: 12000, increase: 256, count: 0, requiredPoints: 2550 },
    { id: 10, name: 'Private Attorney', cost: 13000, increase: 512, count: 0, requiredPoints: 5110 },
    { id: 11, name: 'Safe House', cost: 15240, increase: 1024, count: 0, requiredPoints: 10230 },
    { id: 12, name: 'Camper Van', cost: 18480, increase: 2048, count: 0, requiredPoints: 20470 },
    { id: 14, name: 'Money Laundering Business', cost: 81920, increase: 8192, count: 0, requiredPoints: 81910 },
    { id: 15, name: 'Whorehouse', cost: 163840, increase: 16384, count: 0, requiredPoints: 163830 },
    { id: 16, name: 'Manual Grenade', cost: 327680, increase: 32768, count: 0, requiredPoints: 327670 },
    { id: 17, name: 'Drug Mule Network', cost: 655360, increase: 65536, count: 0, requiredPoints: 655350 },
    { id: 18, name: 'Chemical Engineer', cost: 1310720, increase: 131072, count: 0, requiredPoints: 1310710 },
    { id: 19, name: 'Anonymous Hacker', cost: 2621440, increase: 262144, count: 0, requiredPoints: 2621430 },
    { id: 20, name: 'Clandestine Meth Laboratory', cost: 5242880, increase: 524288, count: 0, requiredPoints: 5242870 },
    { id: 21, name: 'Fake IDs and Passports Facility', cost: 10485760, increase: 1048576, count: 0, requiredPoints: 10485750 },
    { id: 22, name: 'Bank in Offshore Account', cost: 20971520, increase: 2097152, count: 0, requiredPoints: 20971510 },
    { id: 23, name: 'Speedboat', cost: 41943040, increase: 4194304, count: 0, requiredPoints: 41943030 },
    { id: 24, name: 'Advanced Surveillance System', cost: 83886080, increase: 8388608, count: 0, requiredPoints: 83886070 },
    { id: 25, name: '1/35 Uzi Submachine Gun', cost: 167772160, increase: 16777216, count: 0, requiredPoints: 167772150 },
    { id: 26, name: 'Cargo Truck', cost: 335544320, increase: 33554432, count: 0, requiredPoints: 335544310 },
    { id: 27, name: 'Regional Police Lieutenant', cost: 671088640, increase: 67108864, count: 0, requiredPoints: 671088630 },
    { id: 28, name: 'Warehouse', cost: 1342177280, increase: 134217728, count: 0, requiredPoints: 1342177270 },
    { id: 29, name: 'Luxury Vehicles Collection', cost: 2684354560, increase: 268435456, count: 0, requiredPoints: 2684354550 },
    { id: 30, name: 'Nightclub Chain', cost: 5368709120, increase: 536870912, count: 0, requiredPoints: 5368709110 },
    { id: 31, name: 'Methylamine Plant', cost: 10737418240, increase: 1073741824, count: 0, requiredPoints: 10737418230 },
    { id: 32, name: 'Light Aircraft', cost: 21474836480, increase: 2147483648, count: 0, requiredPoints: 21474836470 },
    { id: 33, name: 'Fake NGOs', cost: 42949672960, increase: 4294967296, count: 0, requiredPoints: 42949672950 },
    { id: 34, name: 'AK-47 Assault Rifle', cost: 85899345920, increase: 8589934592, count: 0, requiredPoints: 85899345910 },
    { id: 35, name: 'Federal Police Agent', cost: 171798691840, increase: 17179869184, count: 0, requiredPoints: 171798691830 },
    { id: 36, name: 'Helicopter', cost: 343597383680, increase: 34359738368, count: 0, requiredPoints: 343597383670 },
    { id: 37, name: 'Secret Tunnel Network', cost: 687194767360, increase: 68719476736, count: 0, requiredPoints: 687194767350 },
    { id: 38, name: 'DEA Agent', cost: 1374389534720, increase: 137438953472, count: 0, requiredPoints: 1374389534710 },
    { id: 39, name: 'Flamethrower', cost: 2748779069440, increase: 274877906944, count: 0, requiredPoints: 2748779069430 },
    { id: 40, name: 'Politician on Payroll', cost: 5497558138880, increase: 549755813888, count: 0, requiredPoints: 5497558138870 },
    { id: 41, name: 'Cargo Ship', cost: 10995116277760, increase: 1099511627776, count: 0, requiredPoints: 10995116277750 },
    { id: 42, name: 'Rocket Launcher', cost: 21990232555520, increase: 2199023255552, count: 0, requiredPoints: 21990232555510 },
    { id: 43, name: 'Federal Judge', cost: 43980465111040, increase: 4398046511104, count: 0, requiredPoints: 43980465111030 },
    { id: 44, name: 'Militia Support', cost: 87960930222080, increase: 8796093022208, count: 0, requiredPoints: 87960930222070 },
    { id: 45, name: 'Taliban Opium Producer', cost: 175921860444160, increase: 17592186044416, count: 0, requiredPoints: 175921860444150 },
    { id: 46, name: 'Private Island', cost: 351843720888320, increase: 35184372088832, count: 0, requiredPoints: 351843720888310 }

  ];

  points$ = new BehaviorSubject<number>(this.points);
  totalPoints$ = new BehaviorSubject<number>(this.totalPoints); // Nueva propiedad
  pointsPerClick$ = new BehaviorSubject<number>(this.pointsPerClick);
  pointsPerSecond$ = new BehaviorSubject<number>(this.pointsPerSecond);
  clickUpgradeCount$ = new BehaviorSubject<number>(this.clickUpgradeCount);
  clickUpgradeCost$ = new BehaviorSubject<number>(this.clickUpgradeCost);
  upgrades$ = new BehaviorSubject<Upgrade[]>(this.upgrades);
  clickUpgrades$ = new BehaviorSubject<Upgrade[]>(this.clickUpgrades);
  achievements$ = new BehaviorSubject<Upgrade[]>([]);

  constructor() {
    setInterval(() => {
      this.incrementPoints(this.pointsPerSecond);
    }, 1000);
  }

  incrementPoints(points: number) {
    const incrementInterval = 1000 / points;
    let pointsToAdd = points;

    const intervalId = setInterval(() => {
      if (pointsToAdd > 0) {
        this.points += 1;
        this.totalPoints += 1;
        this.points$.next(this.points);
        this.totalPoints$.next(this.totalPoints);
        this.updateAvailableUpgrades();
        this.updateAvailableClickUpgrades();
        pointsToAdd -= 1;
      } else {
        clearInterval(intervalId);
      }
    }, incrementInterval);
  }

  addPoints(points: number) {
    this.points += points;
    this.totalPoints += points;
    this.points$.next(this.points);
    this.totalPoints$.next(this.totalPoints);
    this.updateAvailableUpgrades(); 
    this.updateAvailableClickUpgrades();
  }

  click() {
    this.addPoints(this.pointsPerClick);
  }

  buyUpgrade(upgradeId: number) {
    const upgrade = this.upgrades.find(u => u.id === upgradeId);
    if (upgrade && this.points >= upgrade.cost) {
      this.points -= upgrade.cost;
      this.pointsPerSecond += upgrade.increase;
      upgrade.count += 1;
      upgrade.cost = Math.floor(upgrade.cost + 5);

      this.points$.next(this.points);
      this.pointsPerSecond$.next(this.pointsPerSecond);
      this.upgrades$.next(this.upgrades);

      this.addAchievement(upgrade);
    }
  }

  buyClickUpgrade(upgradeId: number) {
    const upgrade = this.clickUpgrades.find(u => u.id === upgradeId);
    if (upgrade && this.points >= upgrade.cost) {
      this.points -= upgrade.cost;
      this.pointsPerClick += upgrade.increase;
      upgrade.count += 1;
      upgrade.cost = Math.floor(upgrade.cost + 5);

      this.points$.next(this.points);
      this.pointsPerClick$.next(this.pointsPerClick);
      this.clickUpgrades$.next(this.clickUpgrades);

      this.addAchievement(upgrade);
    }
  }

  private addAchievement(upgrade: Upgrade) {
    if (upgrade.count === 1) {  
      const currentAchievements = this.achievements$.getValue();
      this.achievements$.next([...currentAchievements, upgrade]);
    }
  }

  private updateAvailableUpgrades() {
    const availableUpgrades = this.upgrades.filter(upgrade => this.totalPoints >= upgrade.requiredPoints);
    this.upgrades$.next(availableUpgrades);
  }

  private updateAvailableClickUpgrades() {
    const availableClickUpgrades = this.clickUpgrades.filter(upgrade => this.totalPoints >= upgrade.requiredPoints);
    this.clickUpgrades$.next(availableClickUpgrades);
  }
}
