// membuat element style
let dynamicSheet = null;
if(!dynamicSheet && typeof document !== undefined){
  const styleElement = document.createElement('style')
  styleElement.id = 'letscss-dynamic-styles'
  styleElement.textContent=`html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
      article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }`
  document.head.appendChild(styleElement)
  dynamicSheet = styleElement.sheet
}
const sparator={ //values css
  S:' ',
  D:'.',
  K:',',
  H:'#',
  I:'!mportant',
  P:'%',
  E:'',
  L:'/'
}
// ===============================================================================
const replaceChar=(key)=>{
  if(key.includes('F')){
    const fIndex= key.indexOf('F')
    const parent=valAbr(key.substring(0,fIndex))
    const child =key.substring(fIndex+1)
    key=`${parent}(${replaceChar(child)})`
  }
  key.match(/\d+(?=S)/g)?key=key.replace(/(?<=\d)S/g,'px '):key
  key.match(/\d$/)?key=key+'px':key
  const pattern = new RegExp(Object.keys(sparator).join('|'),'g');
  return key.replace(pattern,match=>sparator[match])||key;
}
// ==============================================================================
// Menghilangkan duplikasi dalam array
const newSet=(arr)=>[...new Set(arr)];
// ===============================================================================
// Normalisasi aturan CSS
const normalizeRule=(rule)=>rule.trim();
// Menyisipkan aturan CSS ke dalam stylesheet jika belum ada
const existingRules = new Set();
function sheetRule(rule) {
  const normalizedRule = normalizeRule(rule);
  try{
    if (!existingRules.has(normalizedRule)) {
      dynamicSheet.insertRule(rule,dynamicSheet.cssRules.length);
      existingRules.add(normalizedRule);
    }
  }catch(e){console.warn('letscss: Gagal menyisipkan rule ->',rule)}
}
// =================================================================================

// Fungsi untuk mengolah kelas
const processedNodes=new WeakMap()
function cls(nodeList) {
  const classes = [];
  nodeList.forEach(node => {
    if(!node)return;
    const classList = node.getAttribute('class');
    if(processedNodes.get(node)===classList)return;
    if (classList)classes.push(...classList.split(/\s+/));//jika ada classlist,simpan di classes, rresult[class_list,classlist,class-list_clas-list]
    processedNodes.set(node,classList)
  });
// bersihkan class yang sama
  const uniqueClasses = newSet(classes);
  uniqueClasses.forEach(className => {
    const firstUnderscore=className.indexOf('_')
    if(firstUnderscore === -1)return;
    const rawProp=className.substring(0,firstUnderscore)
    const rawVal=className.substring(firstUnderscore + 1)
    if(rawProp&&rawVal)prosesRule(className,rawProp,rawVal)
  });
}
// Fungsi untuk membangun aturan CSS
function prosesRule(className,rawProp,rawVal){
  const mediaPrefix = className.charAt(0)
  const cleanProp = rawProp.replace(/^(S|M|L)/,'')
  const propName = keyAbr(cleanProp)
  const value = valAbr(replaceChar(rawVal))
  let ruleStr = `.${className} { ${propName} : ${value};`
  switch(mediaPrefix){
    case 'S':
        small([ruleStr])
        break;
    case 'M':
        medium([ruleStr])
        break
    case 'L':
        large([ruleStr])
        break
    default:
        sheetRule(ruleStr)
  }
}
// =======================================================================
// Membuat aturan media query
function small(selector) {
  const uniqueSelector = newSet(selector);
  const rule = `@media (max-width: 767px) { ${uniqueSelector.join('\n')} }`;
  sheetRule(rule);
}

function medium(selector) {
  const uniqueSelector = newSet(selector);
  const rule = `@media (min-width: 768px) { ${uniqueSelector.join('\n')} }`;
  sheetRule(rule);
}

function large(selector) {
  const uniqueSelector = newSet(selector);
  const rule = `@media (min-width: 992px) { ${uniqueSelector.join('\n')} }`;
  sheetRule(rule);
}
// ======================================================================
// Menerjemahkan singkatan properti CSS

function keyAbr(key) {
  const obj = {
    ac:'align-content',
    ai:'align-items',
    as:'align-self',
    b: 'bottom',
    // border
    bb:'border-bottom',
    bd:'border',
    bg: 'background',
    bl:'border-left',
    br:'border-right',
    brd:'border-radius',
    bsd:'box-shadow',
    bt:'border-top',
    cl: 'color',
    cur:'cursor',
    d: 'display',
    fd:'flex-direction',
    ff:'font-family',
    fs:'font-size',
    fw:'font-weight',
    gtc:'grid-template-columns',
    gtr:'grid-template-rows',
    h: 'height',
    jc: 'justify-content',
    ji:'justify-items',
    ld:'list-decoration',
    l: 'left',
    m: 'margin',
    mb: 'margin-bottom',
    ml: 'margin-left',
    mr: 'margin-right',
    mt: 'margin-top',
    maxw:'max-width',
    maxh:'max-height',
    minw:'min-width',
    minh:'min-height',
    ops:'opacity',
    p: 'padding',
    pb: 'padding-bottom',
    pl: 'padding-left',
    pr: 'padding-right',
    pt: 'padding-top',
    pos: 'position',
    r: 'right',
    ta:'text-align',
    td:'text-decoration',
    t: 'top',
    tst:'transition',
    trf:'transform',
    trs:'translate',
    trsx:'translateX',
    trsy:'translateY',
    w: 'width',
    z:'z-index'
  };
  return obj[key] || key;
}

function valAbr(val){
  const obj={
    s:'small',
    m:'medium',
    l:'large',
    xl:'x-large',
    lr:'larger',
    ct:'center',
    sa:'space-around',
    sb:'space-between',
    se:'space-evenly',
    au:'auto',
    nn:'none',
    abs:'absolute',
    fix:'fixed',
    rel:'relative',
    sti:'sticky',
    fit:'fit-content',
    col:'column',
    poin:'pointer',
    tst:'transition',
    trf:'transform',
    trs:'translate',
    trsx:'translateX',
    trsy:'translateY'

  }
  return obj[val]||val
}
// ====================================================================
// Pemrosesan gaya
  let debounceTimeout;
function init(){
  if(typeof document === 'undefined')return;
  const style = () =>{
    const node = document.querySelectorAll('[class]')
    cls(node)
  };
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(style,50))
  }else{
    setTimeout(style,50)
  }
  // Debounce untuk menghindari pembaruan yang terlalu cepat
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(style, 50);
  });
  
  const targetRoot = document.getElementById('root')|| document.body
  if(targetRoot)observer.observe(targetRoot, { childList: true, subtree: true ,attributes:true,attributeFilter:['class']});
}
// ====================================================================
if(typeof window !== 'undefined'){init()}