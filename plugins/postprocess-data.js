import { S, store, setTick} from '~/plugins/soyuz-store-api';

export const modelProcess = (b, type, value) => {      
  let path = ''
  // map with collected data
  if(b.source_map.collection){
    path = `${b.collection_source}.${b.collection_index}.${b.source_map.collection}`
  } else
  // map with strage by path
  if(b.source_map.source_path){
    path = `${b.source_map.source_path}`
  } else
  // map with strage by target
  if(b.source_map.rest_path){
    path = `${b.source_map.source}.${b.source_map.source_slug}.${b.source_map.source_path}.${b.source_map.rest_path}`
  }

  if(type == 'get'){
    return S.get({ source: path })
  }else
  if(type =='set'){
  	 setTick()
    return S.set({ source: path, value })
  }
}