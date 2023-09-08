import { GameObject } from "./Map";
export class Component {
  private components: Component[];
  active: boolean;
  constructor(components: Component[] = []) {
    this.components = components;
    this.active = true;
  }
  execute(GameObject: GameObject) {
    this.active = true;
    this.components.forEach((component) => {
      component.execute(GameObject);
    });
  }
  cleanup(GameObject: GameObject) {
    this.components.forEach((component) => {
      component.cleanup(GameObject);
    });
    this.active = false;
  }
  addComponent(component: Component): Component {
    this.components.push(component);
    return this;
  }
  removeCompopnent(component: Component): Component {
    this.components = this.components.filter((c) => c !== component);
    return this;
  }
}
