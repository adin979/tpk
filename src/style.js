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
// Fungsi untuk mengolah kelas
const processedNodes=new WeakMap()
// ==============================================================================
// Menghilangkan duplikasi dalam array
const newSet=(arr)=>[...new Set(arr)];
// ==============================================================================// ===============================================================================
// Fungsi pertama berjalan
// Memproses class dalam tag HTML
// ===============================================================================
function cls(nodeList) {
  const classes = [];
  nodeList.forEach(node => {
    if(!node)return;
    const classList = node.getAttribute('class');
    if(processedNodes.get(node)===classList)return;
    if (classList)classes.push(...classList.split(/\s+/));//jika ada classlist,simpan di classes, rresult[class_list,classlist,class-list_clas-list]
    processedNodes.set(node,classList)
  });
// ======================================================================================
// bersihkan class yang sama
// ======================================================================================
  const uniqueClasses = newSet(classes);
  uniqueClasses.forEach(className => {
    const firstUnderscore=className.indexOf('_')
    if(firstUnderscore === -1)return;
// pembagian key dan value
    const rawProp=className.substring(0,firstUnderscore)
    const rawVal=className.substring(firstUnderscore + 1)
// proses kalau memenuhi sarat
// =====================================================================================
// Fungsi untuk membangun aturan CSS
// Proses utama 
// =====================================================================================
  // cek classname====
  const mediaPrefix = className.charAt(0)//cek apa ada karakter prefix
  const arrayCombine=combinator(className,rawProp)
  className=arrayCombine[0]
  const cleanRawProp=arrayCombine[1]
  // cek prop
  const cleanProp = cleanRawProp.replace(/^(S|M|L)/,'')//bersihkan prop dari karakter prefix
  const propName = keyAbr(cleanProp)//terjemahkan singkatan dari properti/key
  // cek value
  const value = valAbr(replaceChar(rawVal))//terjemahkan singkatan untuk value
  // buat rule
  const ruleStr = `.${className} { ${propName} : ${value};`
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
})
}
// ==============================================================================
// Aturan media query responsip
// ==============================================================================
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
// ==========================================================================
// 
// Normalisasi aturan CSS
const normalizeRule=(rule)=>rule.trim();
// Menyisipkan aturan CSS ke dalam stylesheet jika belum ada
const existingRules = new Set();
// =======================================================================
// Menyimpan rule kedalam sheet
// ===============================================================================
function sheetRule(rule) {
  const normalizedRule = normalizeRule(rule);
  try{
    if (!existingRules.has(normalizedRule)) {
      dynamicSheet.insertRule(rule,dynamicSheet.cssRules.length);
      existingRules.add(normalizedRule);
    }
  }catch(e){console.warn('letscss: Gagal menyisipkan rule ->',rule)}
}
// ===============================================================================
// Menerjemahkan singkatan key properti CSS
// ======================================================================
function combinator(className,rawProp){
  const pseudoClass=['hov','act','foc','link','visit']
  const pseudoEl=['fline','flet','bef','aft','mar','select','drop']
  // cari index tanda '-'
  const findIndex = className.indexOf('-');
  // cari kata pertama sebelum '-'
  let firstIndex = className.substring(0,findIndex);
  firstIndex=firstIndex.replace(/^S|M|L/,'')||firstIndex
  rawProp=rawProp.replace(/^S|M|L/,'')||rawProp
  if(pseudoClass.includes(firstIndex)){
  rawProp=rawProp.replace(`${firstIndex}-`,'')
    switch(firstIndex){
      case 'hov':className=`${className}:hover`;break
      case 'foc':className=`${className}:focus`;break
      case 'act':className=`${className}:active`;break
      case 'link':className=`${className}:link`;break
      case 'visit':className=`${className}:visited`;break
    }
  }else if(pseudoEl.includes(firstIndex)){
  rawProp=rawProp.replace(`${firstIndex}-`,'')
    switch(firstIndex){
      case 'fline':className=`${className}::first-line`;break
      case 'flet':className=`${className}::first-letter`;break
      case 'bef':className=`${className}::before`;break
      case 'aft':className=`${className}::after`;break
      case 'mar':className=`${className}::marker`;break
      case 'select':className=`${className}::selected`;break
      case 'drop':className=`${className}::backdrop`;break
    }
  }
  return [className,rawProp]
}

function keyAbr(key) {

  const obj = {
    ac:'align-content',
    ai:'align-items',
    as:'align-self',
    b: 'bottom',
    // border
    bb:'border-bottom',
    bc:'border-color',
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
    l: 'left',
    ld:'list-decoration',
    lh:'line-height',
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
    tstd:'transition-duration',
    trf:'transform',
    trfo:'transform-origin',
    trs:'translate',
    trsx:'translateX',
    trsy:'translateY',
    w: 'width',
    z:'z-index'
  };
  return obj[key] || key;
}

// ===============================================================================
// Sparator dalam value css
// ===============================================================================
const sparator={ //values css
  S:' ',
  __:',',
  _:' ',
  D:'.',
  K:',',
  H:'#',
  IM:'!important',
  E:'',
  L:'/',
  C:'"'
}
// ===============================================================================
// Mengoolah sparator value
// ===============================================================================
const replaceChar=(key)=>{
  const func={
    asoc:'acos',
    asin:'asin',
    atan:'atan',
    atan2:'atan2',
    attr:'attr',
    blur:'blur',
    gright:'brightness',
    calc:'calc',
    circle:'circle',
    clamp:'clamp',
    cl:'color',
    clmix:'color-mix',
    conic:'conic-gradient',
    cont:'contras',
    cos:'cos',
    count:'counter',
    counts:'counters',
    cubic:'cubic-bezier',
    drop:'drop-shadow',
    ell:'ellipe',
    exp:'exp',
    fit:'fit-content',
    gray:'grayscale',
    hsl:'hsl',
    hsla:'hsla',
    hr:'hue-rotate',
    hwb:'hwb',
    hypot:'hypot',
    inset:'inset',
    linear:'linear-gradient',
    log:'log',
    mat:'matrix',
    mat3:'matrix3d',
    max:'max',
    min:'min',
    minmax:'minmax',
    opc:'opacity',
    radial:'radial-gradient',
    rem:'rem',
    repeat:'repeat',
    repcon:'repeating-conic-gradient',
    reprad:'repeating-radial-gradient',
    replin:'repeating-linear-gradient',
    rgb:'rgb',
    rgba:'rgba',
    rotate:'rotate',
    rotate3d:'retate3d',
    rotatex:'rotateX',
    rotaty:'rotateY',
    rotatez:'rotateZ',
    round:'round',
    sat:'saturate',
    scale:'scale',
    scale3d:'scale3d',
    scalex:'scaleX',
    scaley:'scaleY',
    ssepia:'sepia',
    sin:'sin',
    skew:'skew',
    skewx:'skewX',
    skewy:'skewY',
    sqrt:'sqrt',
    trs:'translate',
    trsx:'translateX',
    trsy:'translateY',
    trsz:'translateZ',
    url:'url',
    var:'var',
    xywh:'xywh'
  }
  const indexStrip=key.indexOf('-')
  const firsStrip=key.substring(0,indexStrip)
  const firstIndex=firsStrip.match(/(?:_|\s*)([a-z]+)/)||[]
  if(Object.keys(func).includes(firstIndex[1])){
    const addChar=firsStrip.replace(firstIndex[1],'')
    const parent=func[firstIndex[1]]
    let child =key.substring(indexStrip+1)
    if(firstIndex[1] === 'var')child=`--${child}`
    key=`${addChar}${parent}(${replaceChar(child)})`
  }
  if(key.match(/(?<=\D)0\d/g))key=key.replace(key.match(/(?<=\D)0\d/g),match=>match.split('').join('.'))
    key.match(/\d+(?=S)/g)?key=key.replace(/(?<=\d)S/g,'% '):key
  key.match(/\d$/)?key=key+'%':key
if(key.match(/\d+(?=^_)_/g))console.log(key)
  const pattern = new RegExp(Object.keys(sparator).join('|'),'g');
  key=key.replace(pattern,match=>sparator[match])||key;
  return key 
}
// ==================================================================================
// Menerjemahkan value css
// ==================================================================================
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

// =================================================================================
// Pemrosesan gaya
// ====================================================================
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
  let debounceTimeout;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(style, 50);
  });
  
  const targetRoot = document.getElementById('root')|| document.body
  if(targetRoot)observer.observe(targetRoot, { childList: true, subtree: true ,attributes:true,attributeFilter:['class']});
}
// ====================================================================
if(typeof window !== 'undefined'){init()}