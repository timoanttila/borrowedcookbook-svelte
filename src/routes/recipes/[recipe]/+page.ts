import { error } from '@sveltejs/kit'
import {api, getHeaders, slugify} from '$lib/store'

export const load: import('@sveltejs/kit').Load = async ({params, url}) => {
  try {
    const slug = params.recipe as string
    let recipe = await fetch(`${api}recipes/${slugify(slug)}`, getHeaders()).then(res => res.json())
    recipe.canonical = url.href
    return recipe
  } catch (err: any) {
    error(404, 'Failed to load recipe: ' + err.message)
  }
}
