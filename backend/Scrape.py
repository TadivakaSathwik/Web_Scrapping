import yfinance as yf
from pymongo import MongoClient

def get_stock_data(tickers):
    data = []
    for ticker in tickers:
        stock = yf.Ticker(ticker)
        info = stock.info
        data.append({
            "ticker": ticker,
            "name": info.get("shortName"),
            "price": info.get("currentPrice"),
            "market_cap": info.get("marketCap"),
            "day_high": info.get("dayHigh"),
            "day_low": info.get("dayLow"),
            "52_week_high": info.get("fiftyTwoWeekHigh"),
            "52_week_low": info.get("fiftyTwoWeekLow"),
            "volume": info.get("volume"),
            "avg_volume": info.get("averageVolume"),
        })
    return data

# Example tickers - Replace with actual top 5 marginal and leading companies' tickers
marginal_companies_tickers = ["TSLA", "AAPL", "MSFT", "GOOGL", "AMZN"]
leading_companies_tickers = ["BRK-A", "JNJ", "V", "WMT", "PG"]

# Get data
marginal_companies_data = get_stock_data(marginal_companies_tickers)
leading_companies_data = get_stock_data(leading_companies_tickers)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Replace with your MongoDB URI if not running locally
db = client['finance_db']  # Create/use a database called "finance_db"
marginal_companies_collection = db['marginal_companies']
leading_companies_collection = db['leading_companies']

# Insert/update data in MongoDB
marginal_companies_collection.delete_many({})  # Clear existing data
leading_companies_collection.delete_many({})  # Clear existing data
marginal_companies_collection.insert_many(marginal_companies_data)
leading_companies_collection.insert_many(leading_companies_data)

print("Data inserted into MongoDB successfully.")
