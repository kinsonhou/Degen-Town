from openai import OpenAI

class LLMService:
    def __init__(self):
        self.client = OpenAI()
        
    async def get_completion(self, messages, model="gpt-3.5-turbo", temperature=0.7):
        try:
            response = await self.client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature
            )
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"调用LLM服务时出错: {str(e)}")
            raise e