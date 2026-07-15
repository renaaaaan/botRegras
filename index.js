require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  Events,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('regras')
    .setDescription('Envia as regras do servidor')
].map(command => command.toJSON());

client.once(Events.ClientReady, async c => {
  console.log(`✅ ${c.user.tag} online`);

  const rest = new REST({ version: '10' })
    .setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Comando /regras registrado');
  } catch (error) {
    console.error(error);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'regras') {

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🌙 LUNAR STORE')
      .setDescription(`
# 📜 REGRAS GERAIS

> **1. Respeito acima de tudo**
> Sem toxicidade, preconceito, racismo, homofobia ou discurso de ódio.
> Discussão saudável é bem-vinda, brigas não.

━━━━━━━━━━━━━━

> **2. Sem spam/flood**
> Nada de mensagens repetidas, excesso de emojis ou CAPS.

━━━━━━━━━━━━━━

> **3. Conteúdo NSFW**
> Proibido em canais gerais.
> Casos graves resultam em banimento permanente.

━━━━━━━━━━━━━━

> **4. Divulgação**
> Divulgação apenas com autorização da equipe.

━━━━━━━━━━━━━━

> **5. Staff**
> Respeite as decisões da equipe.
> Caso discorde, abra um ticket.

━━━━━━━━━━━━━━

> **6. Bom senso**
> Nem toda situação está escrita nas regras.
> Use o bom senso e respeite os demais membros.

━━━━━━━━━━━━━━

📋 **Foi punido injustamente?**
Abra um ticket para análise.
      `)
      .setFooter({
        text: 'LUNAR STORE • Sistema Automático'
      });

    await interaction.channel.send({
      content: '@everyone',
      embeds: [embed]
    });

    await interaction.reply({
      content: '✅ Regras enviadas!',
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
