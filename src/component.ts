import { GameObject } from "./Map";
export class Component {
  private components: Component[];
  constructor(components: Component[] = []) {
    this.components = components;
  }
  execute(GameObject: GameObject) {
    this.components.forEach((component) => {
      component.execute(GameObject);
    });
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
