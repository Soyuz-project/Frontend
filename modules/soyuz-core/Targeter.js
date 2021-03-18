
import { S, store, tick } from '~/plugins/soyuz-store-api';
export default {
  // functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    attrs() { 
        /* DirtyHack to run reactivity with store */
        this.blockAttrs.tick = tick.value
        const click = S.get({source:'native_click'})
        this.blockAttrs.click = click
        const rect = click?.box;
        this.blockAttrs.controlls = `top: ${rect?.top - 30}px; left: ${rect?.left - 1}px; border: 1px solid #668ec2;`;
        this.blockAttrs.line1 = `top:${rect?.top - 1}px; left:${rect?.left-20}px; width: ${rect?.w+40}px; height: 1px; border-top: 1px solid #668ec2;`;
        this.blockAttrs.line2 = `top: ${rect?.top+rect?.h}px; left: ${rect?.left-20}px; width: ${rect?.w+40}px; height: 1px; borderTop: 1px solid #668ec2;`;  
        this.blockAttrs.line3 = `left: ${rect?.left - 1}px; top: ${rect?.top-20}px; width: 1px; height: ${rect?.h+40}px; borderLeft: 1px solid #668ec2;`;
        this.blockAttrs.line4 = `left: ${rect?.left+rect?.w}px; top: ${rect?.top-20}px; width: 1px; height: ${rect?.h+40}px; borderLeft: 1px solid #668ec2;`;

        return Object.assign({}, this.blockAttrs)
    },
  },
  render(h) {
    const slots = this.$scopedSlots.default();
    return  (
       <div class="targeter">
        <div class={['short-controlls', this.attrs?.className]} style={this.attrs.controlls}>{slots}</div>
        <div class="target-line" style={this.attrs.line1}></div>
        <div class="target-line" style={this.attrs.line2}></div>
        <div class="target-line" style={this.attrs.line3}></div>
        <div class="target-line" style={this.attrs.line4}></div>
      </div>
    );
  },
};


