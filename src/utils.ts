export async function delay(ms: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export async function * asyncGenerator <T> (func: (value?:T) => Promise<void | T>) {
  let count = 0;
  while (true) {
    count ++;
    try {
      const dates = await func();
      yield {count, dates, error:''};
      break;
    } catch (e) {
      yield {count, dates: undefined, error: e.message};
    }
  }
}

export async function waitForUnErrorExecution <T> (func: (value?:T) => Promise<void | T>): Promise<void | T> {
  for await (let {count, dates, error} of asyncGenerator(func)) {
    console.log(count, dates, error);//сюда попадаю когда данные прочитаны
    if (dates) {
      return dates;
    }
    await delay(1000);
  }
}