
import { action } from '~/plugins/soyuz-targeter';
import { modelProcess } from '~/plugins/postprocess-data';
import { tick, store, setTick} from '~/plugins/soyuz-store-api';


export default {
  name: 'Select-class',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showIcon: this.blockAttrs.showIcon || false,
      inputClass: 'td -pad-s -b -b-light-gray',
    };
  },
  computed: {
    value: {
      get() {
        return modelProcess(this.blockAttrs, 'get')
      },
      set(value) {
        return modelProcess(this.blockAttrs, 'set', value)
      },
    },
    open(ba){
      ba.tick = tick.value
      return store['soyuz_native_dropdown']
    }
  },
  render(h) {
    const open = (ba) => {
      store['soyuz_native_dropdown'] = ba?.default_data[0].name
    }
    const selected = (ba) => {
      if(this.value){
        let isExist = '';
        ba?.default_data.forEach((item) => {
          this.value.split(' ').find(element => element == item.value) ? isExist = item : null
        })
        return isExist;
      }
    }
    const change = (e, ba, item) => {
      const a = this.value.split(' ');
      let isExist = selected(ba, item)?.value;
      if(isExist){
        isExist == item.value ? this.value = a.join(' ').replace( isExist, '' ) : this.value = a.join(' ').replace( isExist, item.value )
      }else{
        a.push(item.value)
        this.value = a.join(' ')
      }
      store['soyuz_native_dropdown'] = null
    }
    const label = (ba) => {
      const s = selected(ba);
      return s?.name ? 
        { name: s?.name, icon: s?.icon } : 
        { name: ba?.default_data[0].name, icon: ba?.default_data[0].icon }
    }
    return  (
      <div class={[this.blockAttrs?.className, 'select']}>
        <div onClick={(e) => open(this.blockAttrs)} title={label(this.blockAttrs).name} >
          {this.blockAttrs.showLabel && <span>{label(this.blockAttrs).name}</span>}
          {this.showIcon && <inner-block blocks={{
            "blockName": "coresvg",
            "attrs": {
              "className": "-center -middle -mar-s",
              "size":24,
              "fill":"#666",
              "viewBox" : "0 0 24 24",
              "path": label(this.blockAttrs).icon?.path
            }
          }} />}
        </div>
        {this.open == this.blockAttrs?.default_data[0].name && <ul>
          {this.blockAttrs.default_data.map((item, i) => {
            return <li 
              key={i} 
              title={item.name}
              onClick={(e) => change(e, this.blockAttrs, item)} 
              class={[
                'tr', 
                this.blockAttrs?.optionsClassName, 
                selected(this.blockAttrs)?.value == item.value ? 'selected' : ''
              ]}>
              { this.showIcon && item?.icon && <inner-block key={i} blocks={{
                  "blockName": "coresvg",
                  "attrs": {
                    "className": "-center -middle",
                    "size":24,
                    "fill":"#666",
                    "viewBox" : "0 0 24 24",
                    "path": item?.icon.path
                  }
              }} />}
              { this.blockAttrs.showLabel && <span>{item.name}</span> }
            </li>
          })}
        </ul>}
      </div>
    );
  },
};

