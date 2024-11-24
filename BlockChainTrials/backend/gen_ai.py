from transformers import AutoModelForCausalLM, AutoTokenizer

# Load the GPT-2 model and tokenizer without specifying 'framework'
model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Now, you can use the model with your pipeline
from transformers import pipeline
report_generator = pipeline("text-generation", model=model, tokenizer=tokenizer)
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

# Create a text generation pipeline
report_generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# Example of generating a sustainability report
def generate_report(metrics):
    prompt = "Generate a detailed sustainability report based on the following metrics:\n" + metrics
    response = report_generator(prompt, max_length=500)
    return response[0]["generated_text"]

# Example usage
print(generate_report("Carbon emissions reduced by 20%, water usage reduced by 15%."))
