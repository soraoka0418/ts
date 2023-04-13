// 型一覧
// boolean
const hasValue: boolean = true
// number
const count: number = 0
// string
const string: string = 'hello'

// オブジェクトの型
const person: {
  name: string,
  age: number
} = {
  name: 'sora',
  age: 23
}

// object型
const person2 : object = {
  name: 'sora',
  age: 23
}
// objectとしての情報しか持たないからerrorになる({} この定義でもほとんど同じ)
// console.log(person2.name)

// 配列の型
const fruits: string[] = ['apple', 'banana', 'group']

// tuple型
// 配列の要素の型まで指定する
const book: [string, number, boolean] = ['manga', 500, false]
// 
// 追加はできるが参照するときにエラーになる
book.push(30)
// console.log(book[3])

// enum型 列挙型　特定のものだけが入るようにする
enum CoffeeSize {
  SHORT = 'SHORT',
  TALL ='TALL',
  GRANDE = 'GRANDE',
}

const coffee = {
  hot: true,
  size: CoffeeSize.TALL
}

// any型 jsの状態
// なるべく使わない
let anything: any = true
anything = 'any'

// union型
// 複数の型をとれる
let unionType: number | string = 10
unionType = 'union'
// 配列の時
const unionTypes: (number | string)[] = [10, 'union']

// Literal型 
const apple: 'apple' = 'apple'
// union & Literal
let clothSize: 'small' | 'medium' | 'large' = 'large'

// typeエイリアス 
// jsになると消える
type ClothSize = 'small' | 'medium' | 'large'
const cloth: {
  color: string,
  size: ClothSize
} = {
  color: 'red',
  size: 'medium'
}

// 関数の型付け
// parameterに型つける
// 戻り値にはなくても大丈夫
const add = (num1:number, num2:number):number => {
  return num1 + num2
}

// void型 何も返さない
const sayHello = ():void => {
  console.log('hello')
}

// 関数の型注釈
const fnAdd: (n1: number, n2:number) => number = add
const doubleNumber: (num: number) => number = num => num * 2

// callback関数
const doubleAndHandle = (num: number, cb: (num: number) => number):void => {
  const doubleNum = cb(num * 2)
  console.log(doubleNum * 2)
}
doubleAndHandle(20, doubleNum => {
  return doubleNum
})

// unknown型
let unknownInput: unknown
let anyInput: any
let text: string
// unknown型だけエラーになる
// text = unknownInput
// text = anyInput

// if文で型を保証することで使える
if(typeof unknownInput === 'string') {
  text = unknownInput
}

// never型
// 何も返さない
const error = (message: string): never => {
  throw new Error(message)
}

// interface
// objectだけにしか使えない
interface Human {
  name: string
  age: number

  // 以下どちらも同じ
  // greeting: (message: string) => void
  // objectの中の関数(method)では以下のように書ける
  greeting(message: string): void
}

const human: Human = {
  name: 'sora',
  age: 23,
  greeting(message: string) {
    console.log(message)
  }
}
// インターセクション型
type Engineer = {
  name: string
  role: string
}
type Blogger = {
  name: string
  follower: number
}

// どちらもなくてはいけない型
type EngineerBlogger = Engineer & Blogger

const sora: EngineerBlogger = {
  name: 'sora',
  role: 'front-end',
  follower: 100,
}

type NumberBoolean = number | boolean
type StringNumber = string | number
// 型がnumberになる(重なってる部分)
type Mix = NumberBoolean & StringNumber


// type guard

// typeof
const toUpperCase = (x:string | number) => {
  if(typeof x === 'string') {
    return x.toUpperCase()
  }
  return ''
}

// in演算子
type NomadWorker = Engineer | Blogger
const describeProfile = (NomadWorker: NomadWorker) => {
  console.log(NomadWorker.name)
  if('role' in NomadWorker) {
    console.log(NomadWorker.role)
  }
  if('follower' in NomadWorker) {
    console.log(NomadWorker.follower)
  }
}

// instanceof
class Dog {
  kind:'dog' = 'dog'
  speak() {
    console.log('bow-wow')
  }
}
class Bird {
  kind:'bird' = 'bird'
  speak() {
    console.log('tweet-tweet')
  }
  fly() {
    console.log('flutter')
  }
}

type Pet = Dog | Bird

const havePet = (pet: Pet) => {
  pet.speak()
  // Birdクラスのインスタンスかどうか
  if(pet instanceof Bird) {
    pet.fly
  }
}

// タグ付きユニオン
const havePet2 = (pet: Pet) => {
  pet.speak()
  // 何かしらのタグをつけて判別してswitchで統一して書く
  switch(pet.kind) {
    case 'bird':
      pet.fly()
  }
}

// 型アサーション(手動で型を上書き)
// input: HTMLElement | null
const input = document.getElementById('input')
// if(input) {
//   input.value = 'これが使えない'
// }
const input2 = <HTMLInputElement>document.getElementById('input')
const input3 = document.getElementById('input') as HTMLInputElement
input2.value = '使える'
input3.value = '使える'

// ! nullじゃない
// 型からnullが消える
// document.getElementById('input') as HTMLElement と一緒
const input4 = document.getElementById('input')!

// indexシグネチャ
// すべての型を合わせる必要がある
interface Designer {
  name: string;
  // age: number
  [index: string]: string
}
// 後からプロパティを付け加えられる
const designer: Designer = {
  name: 'sora',
  age: '23'
}
// errorにならない
designer.aaa

// 関数のオーバーロード
// 関数の返り値をリスト化して指定
function toUpperCase2(x: string): string
function toUpperCase2(x: number): number
function toUpperCase2(x: string | number): string | number {
  if(typeof x === 'string') {
    return x.toUpperCase()
  }
  return x
}
// toUpperCase2(x: string): string (+1 overload)
const upperHello = toUpperCase2('hello')

// オプショナルチェーニング
interface DownloadData {
  id: number
  user?: {
    name?: {
      first: string
      last: string
    }
  }
}
const downloadData: DownloadData = {
  id: 1
}
console.log(downloadData.user?.name)

// Nullish Coalescing
// undefinedとnullのときだけ右辺を返す
const userData = downloadData.user ?? 'no-user'

// Lookup型
// オブジェクトから型を取得
type id = DownloadData['id' | 'user']

// 型の互換性
// ok
let target: 'hello' = 'hello'
let source:string = target

enum Color {
  RED,
  BLUE
}
let target2 = Color.RED
let source2 = 0
// ok
// enumとnumberは互換性がある
target2 = source2

// 関数
let target3 = (a: string) => {}
let source3 = (a: string) => {}
// ok
target3 = source3

let target4 = (a: string, b: string) => {}
let source4 = (a: string) => {}
// ok
// 2つ目の引数は無視されるから動く
target4 = source4
target4('hi', 'hello')

let target5 = (a: string) => {}
let source5 = (a: string, b: string) => {}
// error
// 一つしか引数を与えられないのでエラーになる
// target5 = source5

// 関数型のオーバーロード
interface tempFunc {
  (x: string): number
  (x: number): number
}

// すべてに対応している関数しか代入できない
const upperHello3: tempFunc = function(x: string | number) {
  return 0
}
upperHello3('hi')
upperHello3(32)

// 関数型のインターセクションはオーバーロード
interface FuncA {
  (a: number, b: string): number
  (a: string, b: number): number
}
interface FuncB {
  (a: string): number
}
let intersectionFunc: FuncA & FuncB
intersectionFunc = (a: number | string, b?: string | number): number => {
  return 0
}

// 関数型のunionはparameterはインターセクション
// 戻り値はユニオン型になる
interface FuncC {
  (a: number): number
}
interface FuncD {
  (a: string): string
}
let unionFunc: FuncC | FuncD
unionFunc = (a: number | string, b?: string | number): number => {
  return 0
}

// レストパラメーター
function advanceFN(...args: number[]) {
}
advanceFN(2,3,4)
// タプル
// ?であってもなくてもいい/
// 配列やタプルのreadonly
function advanceFn2(...args: readonly [number, boolean?, string?, ...number[]]) {
}
advanceFn2(2,true,'3')

// コンストアサーション
const milk = 'milk' as const
let drink = milk

const array = [10, 20] as const
const sorachi = {
  name: 'sorachi',
  age: 23
} as const 

// typeの中で使うと値から型がとれる
type sorachiType = typeof sorachi


// ジェネリク
const copy = <T>(value: T) => {
  return value
}

copy<string>('hello')
copy<number>(40)

// 型推論される
copy({name: 'sora'}).name


const copy2 = <T extends { name : string }>(value: T) => {
  return value
}
// 制約を付ける
copy2({ name: 'sora' })
// copy2({age: 20})

// keyof
// keyをユニオン型にする
// ネストしたと{}はみない  
type t = keyof { name: 'sora', age: 23}
const copy3 = <T extends {name: string, age: number}, U extends keyof T>(value: T, key: U) => {
  value[key]
  return value
}

copy3({name: 'sora', age: 23}, 'age')
// copy3({name: 'sora', age: 23}, 'piyo')

// interface type
interface TempData<T> {
  id: number,
  data: T[]
}

const tempData:TempData<string> = {
  id: 23,
  data: ['aaa']
} 

interface Todo {
  title: string,
  text: string
}

// ユーティリティー型

// 全部オプショナルになる
type Todoable = Partial<Todo> 
// 全部readonryになる
type ReadTodo = Readonly<Todo>

// promise
const fetchData: Promise<string> = new Promise(resolve => {
  setTimeout(() => {
    resolve('hello')
  }, 3000)
})

fetchData.then(data => {
  data.toUpperCase()
})

// array
const vegetables: string[] = ['Tomato', 'Broccoli', 'Asparagus']
const vegetables2: Array<string> = ['Tomato', 'Broccoli', 'Asparagus']

interface Vegetables {
  readonly tomato: string
  pumpkin?: string
}

// mappedTypes
type MappedTypes = {
  -readonly[P in keyof Vegetables]-?: string
}

// CONDITIONAL_TYPES
type ConditionalTypes = 'tomato' extends string ? number : boolean
type ConditionalTypes2 = string extends 'tomato' ? number : boolean

type DistributiveConditionalTypes<U> = U extends 'tomato' ? string : boolean