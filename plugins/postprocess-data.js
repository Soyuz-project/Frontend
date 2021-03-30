import { S, store, setTick, first} from '~/plugins/soyuz-store-api';
import { fixPath } from '~/plugins/soyuz-targeter';
import { g_p_v , s_p_v} from '~/plugins/soyuz-walker';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';

export const modelProcess = (b, type, value) => {  

  const res = {'path':'', 'target':''}
  // map with collected data
  if(b?.source_map.collection){
    res.path = `${b.collection_source}.${b.collection_index}.${b.source_map.collection}`
  } else
  if(b?.source_map.click){
   	res.target = store.soyuz_native_click ? first(S.get_collection({source:store.soyuz_native_click.source, query_variables:{slug:store.soyuz_native_click.source_slug}})) : {}
	res.path = `${fixPath(store.soyuz_native_click?.__blockPath || [])}.attrs.${b?.source_map.click}`
  } else
   // map with strage by path
  if(b?.source_map.source_path){
    res.path = `${b.source_map.source_path}`
  } 
  if(type == 'get'){
  	if(b?.source_map.click){
  		return g_p_v( res.target, res.path)
  	}else{
  		return S.get({ source: res.path })
  	}
  }else
  if(type =='set'){
  	if(b?.source_map.click){
  		soyuzRouter.routerQuery({'tick':Math.random(10)})
		return s_p_v( res.target, value, res.path )
  	}else{
  		setTick()
    	return S.set({ source: res.path, value })
  	}
  	 
  }
}