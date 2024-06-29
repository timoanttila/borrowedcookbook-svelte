import { error } from '@sveltejs/kit'
import {api, getHeaders, slugify} from '$lib/store'
export const load = async ({fetch, params, url}) => {
  try {
    const slug = params.category as string
    const category = await fetch(`${api}categories/${slugify(slug)}`, getHeaders()).then(res => res.json())
    return {canonical: url.href, category}
  } catch (err: any) {
    error(404, 'Failed to load recipes: ' + err.message)
  }
}
