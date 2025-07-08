import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [generatedLinks, setGeneratedLinks] = useState<
    Array<{
      id: string;
      original: string;
      short: string;
      alias: string;
      clicks: number;
      created: string;
    }>
  >([]);
  const { toast } = useToast();

  const generateShortLink = () => {
    if (!originalUrl) {
      toast({
        title: "Ошибка",
        description: "Введите URL",
        variant: "destructive",
      });
      return;
    }

    const alias = customAlias || Math.random().toString(36).substr(2, 8);
    const shortUrl = `https://short.ly/${alias}`;

    const newLink = {
      id: Date.now().toString(),
      original: originalUrl,
      short: shortUrl,
      alias: alias,
      clicks: Math.floor(Math.random() * 1000),
      created: new Date().toLocaleDateString("ru-RU"),
    };

    setGeneratedLinks([newLink, ...generatedLinks]);
    setOriginalUrl("");
    setCustomAlias("");

    toast({ title: "Успех!", description: "Ссылка создана" });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: "Ссылка скопирована в буфер обмена",
    });
  };

  const totalClicks = generatedLinks.reduce(
    (sum, link) => sum + link.clicks,
    0,
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Link" size={32} className="text-red-500" />
            <h1 className="text-2xl font-bold">LinkGen</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Главная
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Статистика
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              API
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Создавайте <span className="text-red-500">короткие ссылки</span>
            <br />с полной кастомизацией
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Генерируйте короткие ссылки с собственными алиасами и отслеживайте
            их эффективность
          </p>

          {/* Link Generator */}
          <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Zap" size={24} className="text-red-500" />
                Генератор ссылок
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Оригинальная ссылка
                </label>
                <Input
                  placeholder="https://example.com/very-long-url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Кастомный алиас (необязательно)
                </label>
                <Input
                  placeholder="мой-алиас"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <Button
                onClick={generateShortLink}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
              >
                <Icon name="Scissors" size={20} className="mr-2" />
                Создать короткую ссылку
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Generated Links */}
      {generatedLinks.length > 0 && (
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Ваши ссылки</h3>
            <div className="grid gap-4">
              {generatedLinks.map((link) => (
                <Card key={link.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-red-500 font-mono text-lg">
                            {link.short}
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-gray-800 text-gray-300"
                          >
                            {link.clicks} кликов
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm truncate">
                          {link.original}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Создано: {link.created}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(link.short)}
                          className="border-gray-700 hover:bg-gray-800"
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 hover:bg-gray-800"
                        >
                          <Icon name="BarChart3" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistics */}
      <section className="px-6 py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Статистика</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Icon
                  name="Link"
                  size={40}
                  className="text-red-500 mx-auto mb-4"
                />
                <h4 className="text-2xl font-bold text-white">
                  {generatedLinks.length}
                </h4>
                <p className="text-gray-400">Создано ссылок</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Icon
                  name="MousePointer"
                  size={40}
                  className="text-red-500 mx-auto mb-4"
                />
                <h4 className="text-2xl font-bold text-white">{totalClicks}</h4>
                <p className="text-gray-400">Общие клики</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Icon
                  name="TrendingUp"
                  size={40}
                  className="text-red-500 mx-auto mb-4"
                />
                <h4 className="text-2xl font-bold text-white">
                  {Math.round(totalClicks / Math.max(generatedLinks.length, 1))}
                </h4>
                <p className="text-gray-400">Средние клики</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Icon
                  name="Calendar"
                  size={40}
                  className="text-red-500 mx-auto mb-4"
                />
                <h4 className="text-2xl font-bold text-white">30</h4>
                <p className="text-gray-400">Дней активности</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 LinkGen. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
