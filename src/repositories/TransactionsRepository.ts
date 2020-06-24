import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length <= 0) {
      return {
        income: 0,
        outcome: 0,
        total: 0,
      };
    }

    const income = this.transactions.reduce(
      (accTransaction, currTransaction): Transaction => {
        let sum = 0;
        if (accTransaction.type === 'income') {
          sum = accTransaction.value;
        }
        if (currTransaction.type === 'income') {
          sum += currTransaction.value;
        }
        return new Transaction({
          title: 'sum',
          value: sum,
          type: 'income',
        });
      },
    ).value;

    const outcome = this.transactions.reduce(
      (accTransaction, currTransaction): Transaction => {
        let sum = 0;
        if (accTransaction.type === 'outcome') {
          sum = accTransaction.value;
        }
        if (currTransaction.type === 'outcome') {
          sum += currTransaction.value;
        }
        return new Transaction({
          title: 'sum',
          value: sum,
          type: 'outcome',
        });
      },
    ).value;

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
