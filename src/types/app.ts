import { App } from 'vue'
import { Router, RouteRecordRaw } from 'vue-router'

export interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
}

export type UserModule = (ctx: AppContext) => void
