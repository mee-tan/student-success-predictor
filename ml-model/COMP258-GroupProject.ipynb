import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib

# ***************************
# Loading the Data 
# ***************************

data = pd.read_csv('../data/Student data.csv')

# Define columns based on project variables
columns = [
    'First_Term_GPA', 'Second_Term_GPA', 'First_Language', 'Funding', 
    'School', 'FastTrack', 'Coop', 'Residency', 'Gender', 
    'Prev_Education', 'Age_Group', 'HS_Average', 'Math_Score', 
    'English_Grade', 'FirstYearPersistence'
]
data.columns = columns

data.columns

# ***************************
# Data Analysis
# ***************************
missing_summary = data.isnull().sum()
print("Missing Data Summary:")
print(missing_summary)

# Summary of the dataset
print("\nDataset summary:\n", data.describe())

# Check for duplicates
duplicates = data.duplicated().sum()
print("\nNumber of duplicate rows:", duplicates)

# ***************************
#             Data Preprocessing
# ***************************

# ***************************
# Missing Values Strategy.
# *************************

# Method A: Dropping all NaNs 
df_dropped = data.replace('?', np.nan).dropna()

# Method B: Imputation (Mean for Numerical, Mode for Categorical)
df_imputed = data.copy()

# Convert numerical columns from strings to numbers, turning '?' into NaN
num_features = ['HS_Average', 'Math_Score', 'First_Term_GPA', 'Second_Term_GPA']
for col in num_features:
    df_imputed[col] = pd.to_numeric(df_imputed[col], errors='coerce')

# Fill numerical gaps with the Mean 
df_imputed[num_features] = df_imputed[num_features].fillna(df_imputed[num_features].mean())

# Fill Categorical gaps with the Mode (Most Frequent)
cat_features = ['First_Language', 'Gender', 'School', 'Funding', 'English_Grade']
for col in cat_features:
    # Handle '?' in categorical columns before finding mode
    df_imputed[col] = df_imputed[col].replace('?', np.nan)
    df_imputed[col] = df_imputed[col].fillna(df_imputed[col].mode()[0])

# Final safety drop only for the Target labels if they remain null 
df_imputed = df_imputed.dropna(subset=['FirstYearPersistence', 'Second_Term_GPA'])

# ***************************
# Persistence Experiment (Classification)
# ***************************

def run_persistence_experiment(df, name):
    
    # Feature And Target Separation
    X = df.drop(['FirstYearPersistence', 'Second_Term_GPA'], axis=1)
    y = df['FirstYearPersistence'].astype(int)
    
    # Scale only numeric columns for better Neural Network convergence
    scaler = StandardScaler()
    numeric_df = X.select_dtypes(include=[np.number])
    X_scaled = scaler.fit_transform(numeric_df)
    
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    
    # Model architecture for Binary Classification 
    model = Sequential()
    model.add(Dense(64, activation='relu', input_shape=(X_train.shape[1],)))
    model.add(Dropout(0.5)) # to prevent overfitting
    model.add(Dense(32, activation='relu'))
    model.add(Dense(1, activation='sigmoid')) # for binary classification
    model.summary()     

    # Model complilation and training
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    history = model.fit(X_train, y_train, epochs=50, batch_size=10, validation_data=(X_test, y_test), verbose=0)
    
    print ("*" * 50)
    max_acc = max(history.history['val_accuracy'])
    print(f"Persistence Model ({name}) - Max Val Accuracy: {max_acc:.4f}")
    
    return model, history

# Train both versions to compare performance
model_drop, hist_drop = run_persistence_experiment(df_dropped, "Dropped")
model_imp, hist_imp = run_persistence_experiment(df_imputed, "Imputed")


# ***************************
# Academic Performance Model (Regression)
# ***************************
academic_features = ['HS_Average', 'Math_Score', 'English_Grade', 'First_Term_GPA']

X_acad = df_imputed[academic_features]
y_acad = df_imputed['Second_Term_GPA']

scaler_acad = StandardScaler()
X_acad_scaled = scaler_acad.fit_transform(X_acad)

X_train_a, X_test_a, y_train_a, y_test_a = train_test_split(X_acad_scaled, y_acad, test_size=0.2, random_state=42)

model_academic = Sequential([
    Dense(64, activation='relu', input_shape=(X_train_a.shape[1],)),
    Dense(32, activation='relu'),
    Dense(1, activation='linear') # Continuous value output
])

model_academic.summary()

# Model compilation and training for regression
model_academic.compile(optimizer='adam', loss='mse', metrics=['mae'])
model_academic.fit(X_train_a, y_train_a, epochs=50, batch_size=10, validation_data=(X_test_a, y_test_a), verbose=1)

model_academic_accuracy = model_academic.evaluate(X_test_a, y_test_a, verbose=0)
print("\n")
print(f"Academic Performance Model - Test MAE: {model_academic_accuracy[1]:.4f}")


# ***************************
# Model Visulalization.
# ***************************
plt.figure(figsize=(10, 6))
plt.subplot(1, 2, 1)
plt.plot(hist_drop.history['val_loss'], label='Dropped Data Loss')
plt.plot(hist_imp.history['val_loss'], label='Imputed Data Loss')
plt.title('Comparison: Dropping vs. Imputation (Persistence)')
plt.xlabel('Epochs')
plt.ylabel('Val Loss')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(hist_drop.history['val_accuracy'], label='Dropped Data Accuracy')
plt.plot(hist_imp.history['val_accuracy'], label='Imputed Data Accuracy')
plt.title('Comparison: Dropping vs. Imputation (Persistence)')
plt.xlabel('Epochs')
plt.ylabel('Val Accuracy')
plt.legend()
plt.show()


# 6. Save Final Outputs
model_imp.save('../output/new_persistence_model.h5')
model_academic.save('../output/new_academic_model.h5')

joblib.dump(scaler_acad, '../output/new_scalar_academic.pkl')

print("All tasks complete. Ready for full-stack integration!")
