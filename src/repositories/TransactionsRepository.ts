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
    return this.transactions
  }

  public getBalance(): Balance {
    const transactions = this.transactions;

    let incomeValue = 0
    let outcomeValue = 0

    if(transactions.length > 0){
      if(transactions.length > 1){
        transactions.map(item => {
          item.type === 'income' ? incomeValue += item.value : outcomeValue += item.value
        })
      } else {
        transactions[0].type === 'income' ? incomeValue = transactions[0].value : outcomeValue = transactions[0].value
      }

      const balance = {
        income: incomeValue,
        outcome: outcomeValue,
        total: incomeValue - outcomeValue
      }

      return balance
    } else {
      const balance = {
        income: incomeValue,
        outcome: outcomeValue,
        total: 0
      }

      return balance
    }
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction{
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction
  }
}

export default TransactionsRepository;
